import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Flowbite, Toast } from 'flowbite-react'
import { HiExclamation, HiInformationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'

import { Project } from '@/dto/Project'
import { BuildDto } from '@/dto/Build'
import { useAppSelector } from '@/util/redux/Hooks'
import {
    selectLocale,
    selectTranslations,
    StringKey,
} from '@/features/i18n/TranslatorSlice'
import { selectTheme } from '@/features/theme/ThemeSlice'
import { capitalizeFirstLetter } from '@/util/String'
import { formatString, getLocaleStringAsArgs } from '@/util/LocaleHelper'
import { getAPIEndpoint } from '@/util/Environment'
import { customTheme } from '@/util/Theme'
import { compareVersionsDesc } from '@/util/BuildUtil'

import VersionTabs from '@/components/downloadSoftware/VersionTabs'
import LatestBuildCard from '@/components/downloadSoftware/LatestBuildCard'
import CompareBanner from '@/components/downloadSoftware/CompareBanner'
import BuildTimeline from '@/components/downloadSoftware/BuildTimeline'
import BuildDetailsModal from '@/components/downloadSoftware/BuildDetailsModal'
import TimelineSkeleton from '@/components/downloadSoftware/TimelineSkeleton'
import SearchBar, {
    SearchOptions,
} from '@/components/downloadSoftware/SearchBar'

const PAGE_SIZE = 30

/** Mohist versions that ship a standing warning about their support status. */
const MOHIST_VERSION_WARNINGS: Record<string, StringKey> = {
    '1.7.10': 'downloadSoftware.mohist.1.7.10.toast',
    '1.18.2': 'downloadSoftware.mohist.1.18.2.toast',
    '1.19.2': 'downloadSoftware.mohist.1.19.2.toast',
    '1.19.4': 'downloadSoftware.mohist.1.19.4.toast',
    '1.20': 'downloadSoftware.mohist.1.20.toast',
}

/** Version proposed first when the URL does not ask for one. */
const DEFAULT_VERSION: Record<Project, string | undefined> = {
    [Project.Mohist]: '1.20.1',
    [Project.Youer]: undefined,
}

interface ProjectVersion {
    name: string
}

export default function DownloadSoftware() {
    const router = useRouter()
    const strings = useAppSelector(selectTranslations)
    const locale = useAppSelector(selectLocale)
    const mode = useSelector(selectTheme)

    const [project, setProject] = useState<Project | undefined>()
    const [versions, setVersions] = useState<string[]>([])
    const [selectedVersion, setSelectedVersion] = useState<string | undefined>()
    const [builds, setBuilds] = useState<BuildDto[]>([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [search, setSearch] = useState('')
    const [searchOptions, setSearchOptions] = useState<SearchOptions>({
        caseSensitive: false,
        wholeWord: false,
        useRegex: false,
    })
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
    const [selectedHash, setSelectedHash] = useState<string | undefined>()
    const [detailsBuild, setDetailsBuild] = useState<BuildDto | undefined>()

    const searchInput = useRef<HTMLInputElement>(null)
    const compareRef = useRef<HTMLDivElement>(null)
    const searchRestored = useRef(false)

    /* ---------------------------------------------------------------- routing */

    useEffect(() => {
        if (!router.isReady) return

        const { project: queryProject } = router.query as { project: Project }

        if (queryProject === Project.Mohist || queryProject === Project.Youer)
            setProject(queryProject)
        else router.push('/404').catch(() => undefined)
    }, [router.isReady, router.query])

    /* -------------------------------------------------------------- versions */

    useEffect(() => {
        if (!project) return

        const fetchVersions = async () => {
            const response = await fetch(
                `${getAPIEndpoint()}/project/${project}/versions`,
            )
            const payload: ProjectVersion[] = await response.json()
            const names = payload.map((version) => version.name)

            // Sorted for display; the default selection still follows the API order below.
            setVersions([...names].sort(compareVersionsDesc))

            const { projectVersion } = router.query as {
                projectVersion?: string
            }

            setSelectedVersion(
                names.find((name) => name === projectVersion) ??
                    names.find((name) => name === DEFAULT_VERSION[project]) ??
                    names[0],
            )
        }

        fetchVersions().catch(() => setFailed(true))
    }, [project])

    /* ---------------------------------------------------------------- builds */

    useEffect(() => {
        if (!project || !selectedVersion) return

        const fetchBuilds = async () => {
            setLoading(true)
            setFailed(false)
            setBuilds([])
            setSelectedHash(undefined)
            setVisibleCount(PAGE_SIZE)

            await router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, projectVersion: selectedVersion },
                },
                undefined,
                { shallow: true },
            )

            const response = await fetch(
                `${getAPIEndpoint()}/project/${project}/${selectedVersion}/builds`,
            )
            setBuilds(await response.json())
            setLoading(false)
        }

        fetchBuilds().catch(() => {
            setFailed(true)
            setLoading(false)
        })
    }, [project, selectedVersion])

    /* ---------------------------------------------------------------- search */

    useEffect(() => {
        const focusSearch = (event: KeyboardEvent) => {
            if (
                event.key !== '/' ||
                document.activeElement === searchInput.current
            )
                return

            event.preventDefault()
            searchInput.current?.focus()
        }

        window.addEventListener('keydown', focusSearch)
        return () => window.removeEventListener('keydown', focusSearch)
    }, [])

    /* Restore the query from the URL once, then keep the URL in sync with it. */
    useEffect(() => {
        if (!router.isReady || searchRestored.current) return
        searchRestored.current = true

        const query = router.query as Record<string, string | undefined>

        if (query.search) setSearch(query.search)
        setSearchOptions({
            caseSensitive: query.case === 'true',
            wholeWord: query.word === 'true',
            useRegex: query.regex === 'true',
        })
    }, [router.isReady])

    useEffect(() => {
        if (!searchRestored.current) return

        const query = { ...router.query }
        const apply = (key: string, value: string | boolean) => {
            if (value) query[key] = String(value)
            else delete query[key]
        }

        apply('search', search)
        apply('case', searchOptions.caseSensitive)
        apply('word', searchOptions.wholeWord)
        apply('regex', searchOptions.useRegex)

        router
            .replace({ pathname: router.pathname, query }, undefined, {
                shallow: true,
            })
            .catch(() => undefined)
    }, [search, searchOptions])

    const { matcher, invalidRegex } = useMemo(() => {
        const query = search.trim()
        if (!query) return { matcher: null, invalidRegex: false }

        const flags = searchOptions.caseSensitive ? '' : 'i'
        const source = searchOptions.useRegex
            ? query
            : query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

        try {
            return {
                matcher: new RegExp(
                    searchOptions.wholeWord ? `\\b(?:${source})\\b` : source,
                    flags,
                ),
                invalidRegex: false,
            }
        } catch {
            return { matcher: null, invalidRegex: true }
        }
    }, [search, searchOptions])

    const matchingBuilds = useMemo(() => {
        if (invalidRegex) return []
        if (!matcher) return builds

        return builds.filter(
            (build) =>
                matcher.test(build.commit.hash) ||
                matcher.test(build.commit.changelog) ||
                matcher.test(build.commit.author) ||
                matcher.test(build.file_sha256) ||
                matcher.test(String(build.id)),
        )
    }, [builds, matcher, invalidRegex])

    const visibleBuilds = useMemo(
        () => matchingBuilds.slice(0, visibleCount),
        [matchingBuilds, visibleCount],
    )

    const showMore = useCallback(
        () => setVisibleCount((count) => count + PAGE_SIZE),
        [],
    )

    /* --------------------------------------------------------------- actions */

    const toggleSelected = (build: BuildDto) => {
        const turningOn = selectedHash !== build.commit.hash
        setSelectedHash(turningOn ? build.commit.hash : undefined)

        if (turningOn)
            // Let the banner render before scrolling to it.
            window.requestAnimationFrame(() =>
                compareRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                }),
            )
    }

    const latestBuild = builds[0]
    const projectName = capitalizeFirstLetter(project)

    const versionWarning =
        project === Project.Mohist && selectedVersion
            ? MOHIST_VERSION_WARNINGS[selectedVersion]
            : undefined

    return (
        <section className="flex flex-col items-center gap-6 bg-gray-100 pb-20 pt-20 dark:bg-dark-25">
            <Head>
                <title>
                    {formatString(
                        strings['downloadSoftware.page.title'],
                        projectName,
                    )}
                </title>
            </Head>

            <div className="flex items-center justify-center pt-10 md:pt-0">
                <h1 className="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:mt-10 md:text-5xl lg:text-6xl">
                    {
                        getLocaleStringAsArgs(
                            strings['downloadSoftware.title'],
                        )[0]
                    }
                    <span className="text-blue-600 dark:text-blue-500">
                        &nbsp;{projectName}
                    </span>
                    {
                        getLocaleStringAsArgs(
                            strings['downloadSoftware.title'],
                        )[1]
                    }
                </h1>
            </div>

            <p className="mb-3 text-center text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl">
                {project === Project.Mohist
                    ? strings['downloadSoftware.mohist.desc']
                    : strings['downloadSoftware.youer.desc']}
            </p>

            <Flowbite theme={{ theme: customTheme, mode }}>
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-600 dark:text-white">
                        <HiInformationCircle className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        <span className="font-bold">
                            Do NOT ask for help in Spigot, PaperMC, Forge or
                            NeoForge forums.
                        </span>{' '}
                        They are not related to{' '}
                        {project === Project.Youer ? 'Youer' : 'Mohist'} and
                        will not help you. If you have any issue, please use our{' '}
                        <a
                            href="https://discord.gg/mohistmc"
                            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                        >
                            Discord server
                        </a>
                        .
                    </div>
                    <Toast.Toggle />
                </Toast>

                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-600 dark:text-white">
                        <HiExclamation className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        {project === Project.Youer ? (
                            <>
                                <span className="font-bold">
                                    Nightly builds are available at
                                </span>{' '}
                                <a
                                    href="https://github.com/MohistMC/Youer/actions"
                                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                >
                                    GitHub Actions
                                </a>
                                .
                            </>
                        ) : (
                            <>
                                <span className="font-bold">
                                    Older builds are available at
                                </span>{' '}
                                <a
                                    href="https://mohistmc.com/builds-raw"
                                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                >
                                    https://mohistmc.com/builds-raw
                                </a>
                                .
                            </>
                        )}
                    </div>
                    <Toast.Toggle />
                </Toast>

                {project === Project.Mohist && (
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-700 dark:text-white">
                            <HiExclamation className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">
                            <span className="font-bold">
                                {strings['downloadSoftware.mohist.eol.title']}
                            </span>{' '}
                            {strings['downloadSoftware.mohist.eol.body']}{' '}
                            <a
                                href="https://github.com/Rz-C/Mohist"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                            >
                                github.com/Rz-C/Mohist
                            </a>
                            .
                        </div>
                        <Toast.Toggle />
                    </Toast>
                )}

                {versionWarning && (
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-600 dark:text-white">
                            <HiExclamation className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">
                            {strings[versionWarning]}
                        </div>
                        <Toast.Toggle />
                    </Toast>
                )}
            </Flowbite>

            <div className="mt-3 w-full max-w-4xl px-4">
                <div className="flex flex-col gap-6 rounded-lg bg-white p-5 shadow-md dark:bg-dark-50 dark:shadow-md md:p-6">
                    <VersionTabs
                        versions={versions}
                        selectedVersion={selectedVersion}
                        setSelectedVersion={setSelectedVersion}
                        label={strings['downloadSoftware.version.label']}
                    />

                    {loading && <TimelineSkeleton />}

                    {!loading && failed && (
                        <p className="py-6 text-center text-gray-500 dark:text-gray-400">
                            {strings['downloadSoftware.search.nobuilds']}
                        </p>
                    )}

                    {!loading && !failed && builds.length === 0 && (
                        <p className="py-6 text-center text-gray-500 dark:text-gray-400">
                            {strings['downloadSoftware.search.nobuilds']}
                        </p>
                    )}

                    {!loading && latestBuild && project && selectedVersion && (
                        <>
                            <LatestBuildCard
                                build={latestBuild}
                                project={project}
                                projectVersion={selectedVersion}
                                strings={strings}
                            />

                            <SearchBar
                                value={search}
                                onChange={(next) => {
                                    setSearch(next)
                                    setVisibleCount(PAGE_SIZE)
                                }}
                                options={searchOptions}
                                onToggle={(option) => {
                                    setSearchOptions((current) => ({
                                        ...current,
                                        [option]: !current[option],
                                    }))
                                    setVisibleCount(PAGE_SIZE)
                                }}
                                invalidRegex={invalidRegex}
                                strings={strings}
                                inputRef={searchInput}
                            />

                            {selectedHash && (
                                <CompareBanner
                                    ref={compareRef}
                                    builds={builds}
                                    currentHash={selectedHash}
                                    project={project}
                                    projectVersion={selectedVersion}
                                    strings={strings}
                                    onClear={() => setSelectedHash(undefined)}
                                />
                            )}

                            <div>
                                <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    {strings['downloadSoftware.history']}
                                </h2>

                                {matchingBuilds.length === 0 ? (
                                    <p className="py-6 text-gray-500 dark:text-gray-400">
                                        {
                                            strings[
                                                'downloadSoftware.search.noresults'
                                            ]
                                        }
                                    </p>
                                ) : (
                                    <BuildTimeline
                                        builds={visibleBuilds}
                                        allBuilds={builds}
                                        project={project}
                                        projectVersion={selectedVersion}
                                        strings={strings}
                                        locale={locale}
                                        selectedHash={selectedHash}
                                        onOpenDetails={setDetailsBuild}
                                        onToggleSelected={toggleSelected}
                                        onReachEnd={showMore}
                                        hasMore={
                                            visibleCount < matchingBuilds.length
                                        }
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <BuildDetailsModal
                build={detailsBuild}
                project={project}
                projectVersion={selectedVersion}
                open={detailsBuild !== undefined}
                onClose={() => setDetailsBuild(undefined)}
            />
        </section>
    )
}

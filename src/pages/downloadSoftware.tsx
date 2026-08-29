import VersionSelectorElement from '@/components/downloadSoftware/VersionSelectorElement'
import { useRouter } from 'next/router'
import { Project } from '@/dto/Project'
import React, { useEffect, useState } from 'react'
import {BuildDto} from '@/dto/Build'
import NavigationTableElement from '@/components/downloadSoftware/NavigationTableElement'
import TableBuildElement from '@/components/downloadSoftware/TableBuildElement'
import LoadingParagraph from '@/components/downloadSoftware/LoadingParagraph'
import { capitalizeFirstLetter } from '@/util/String'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations, StringKey } from '@/features/i18n/TranslatorSlice'
import { formatString, getLocaleStringAsArgs } from '@/util/LocaleHelper'
import SearchElement from '@/components/downloadSoftware/SearchElement'
import BuildDetailsModal from '@/components/downloadSoftware/BuildDetailsModal'
import { Flowbite, Toast } from 'flowbite-react'
import { HiExclamation, HiInformationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/features/theme/ThemeSlice'
import { getAPIEndpoint } from '@/util/Environment'
import Head from 'next/head'
import { customTheme } from '@/util/Theme'
import BuildSha256Modal from "@/components/downloadSoftware/BuildSha256Modal";

export default function DownloadSoftware() {
    const router = useRouter()
    const strings = useAppSelector(selectTranslations)
    const perPage = 10
    const mode = useSelector(selectTheme)

    // React states
    const [project, setProject] = useState<Project | undefined>()
    const [originalBuildPages, setOriginalBuildPages] = useState<BuildDto[][]>([])
    const [viewedBuildPages, setViewedBuildPages] = useState<BuildDto[][]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [selectedVersion, setSelectedVersion] = useState<string | undefined>()
    const [noResult, setNoResult] = useState<boolean>(false)
    const [noBuild, setNoBuild] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<string | undefined>()
    const [modalBuild, setModalBuild] = useState<BuildDto | undefined>()
    const [toastMessageKey, setToastMessageKey] = useState<
        StringKey | undefined
    >()
    const [hiColor, setHiColor] = useState<string>('orange')

    useEffect(() => {
        if (router.isReady) {
            const { project } = router.query as { project: Project }

            if (project === Project.Mohist || project === Project.Youer)
                setProject(project)
            else router.push('/404').catch()
        }
    }, [router.isReady, router.query])

    useEffect(() => {
        const handleVersionChanged = async () => {
            setViewedBuildPages([])
            setOriginalBuildPages([])
            setNoBuild(false)

            // Update the URL with the new version
            await router.push(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        projectVersion: selectedVersion,
                    },
                },
                undefined,
                { shallow: true },
            )

            if (project === Project.Mohist) {
                switch (selectedVersion) {
                    case '1.7.10':
                        setHiColor('orange')
                        setToastMessageKey(
                            'downloadSoftware.mohist.1.7.10.toast',
                        )
                        break
                    case '1.18.2':
                        setHiColor('blue')
                        setToastMessageKey(
                            'downloadSoftware.mohist.1.18.2.toast',
                        )
                        break
                    case '1.19.2':
                        setHiColor('orange')
                        setToastMessageKey(
                            'downloadSoftware.mohist.1.19.2.toast',
                        )
                        break
                    case '1.19.4':
                        setHiColor('blue')
                        setToastMessageKey(
                            'downloadSoftware.mohist.1.19.4.toast',
                        )
                        break
                    case '1.20':
                        setHiColor('orange')
                        setToastMessageKey('downloadSoftware.mohist.1.20.toast')
                        break
                }
            }

            const projectBuildsReq = await fetch(
                `${getAPIEndpoint()}/project/${project}/${selectedVersion}/builds`,
            )
            const builds: BuildDto[] = await projectBuildsReq.json()

            if (builds?.length === 0) {
                setNoBuild(true)
                // TODO: Toast error
                return
            }

            const pages: BuildDto[][] = []
            for (let i = 0; i < builds.length; i += perPage)
                pages.push(builds.slice(i, i + perPage))

            setOriginalBuildPages(pages)
            setViewedBuildPages(pages)
            setCurrentPage(0)
        }

        selectedVersion && handleVersionChanged().catch()
    }, [selectedVersion])

    return (
        <section className="flex flex-col gap-6 items-center bg-gray-100 dark:bg-dark-25 pt-20 pb-20">
            <Head>
                <title>
                    {formatString(
                        strings['downloadSoftware.page.title'],
                        capitalizeFirstLetter(project),
                    )}
                </title>
            </Head>
            <div className={`flex items-center justify-center pt-10 md:pt-0`}>
                <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white md:mt-10 text-center">
                    {
                        getLocaleStringAsArgs(
                            strings['downloadSoftware.title'],
                        )[0]
                    }
                    <span className="text-blue-600 dark:text-blue-500">
                        &nbsp;{capitalizeFirstLetter(project)}
                    </span>
                    {
                        getLocaleStringAsArgs(
                            strings['downloadSoftware.title'],
                        )[1]
                    }
                </h1>
            </div>
            <p className="text-lg text-center font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-3">
                {project === Project.Mohist
                    ? strings['downloadSoftware.mohist.desc']
                    : strings[`downloadSoftware.youer.desc`]}
            </p>
            <BuildDetailsModal
                build={modalBuild}
                project={project}
                projectVersion={selectedVersion}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
            <BuildSha256Modal
                build={modalBuild}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
            <Flowbite theme={{ theme: customTheme, mode }}>
                <Toast>
                    <div
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-600 dark:text-white`}
                    >
                        <HiInformationCircle className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        <span className={'font-bold'}>
                            Do NOT ask for help in Spigot, PaperMC, Forge or NeoForge
                            forums.
                        </span>{' '}
                        They are not related to{' '}
                        {project === Project.Youer ? 'Youer' : 'Mohist'} and will
                        not help you. If you have any issue, please use our{' '}
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
                {project === Project.Mohist && (
                    <Flowbite theme={{ theme: customTheme, mode }}>
                        <Toast>
                            <div
                                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-orange-500 dark:bg-orange-600 dark:text-white`}
                            >
                                <HiExclamation className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                <span className={'font-bold'}>
                                  Older builds are available at
                                </span>{' '}
                                <a
                                    href="https://mohistmc.com/builds-raw"
                                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                >
                                    https://mohistmc.com/builds-raw
                                </a>
                                .
                            </div>
                            <Toast.Toggle />
                        </Toast>
                    </Flowbite>
                )}
                {project === Project.Youer && (
                    <Flowbite theme={{ theme: customTheme, mode }}>
                        <Toast>
                            <div
                                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-orange-500 dark:bg-orange-600 dark:text-white`}
                            >
                                <HiExclamation className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">
                              <span className={'font-bold'}>
                                Nightly builds are available at
                              </span>{' '}
                                <a
                                    href="https://github.com/MohistMC/Youer/actions"
                                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                >
                                    GitHub Actions
                                </a>
                                .
                            </div>
                            <Toast.Toggle />
                        </Toast>
                    </Flowbite>
                )}
            </Flowbite>
            {toastMessageKey?.length && (
                <Flowbite theme={{ theme: customTheme, mode }}>
                    <Toast>
                        <div
                            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-${hiColor}-100 text-${hiColor}-500 dark:bg-${hiColor}-600 dark:text-white`}
                        >
                            <HiExclamation className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">
                            {strings[toastMessageKey]}
                        </div>
                        <Toast.Toggle />
                    </Toast>
                </Flowbite>
            )}
            <div className="relative shadow-md dark:shadow-md dark:bg-dark-50 bg-white sm:rounded-lg mt-3 p-5">
                <div
                    className={`flex md:justify-between gap-2 justify-center items-center pb-4 flex-wrap`}
                >
                    <SearchElement
                        originalBuildPages={originalBuildPages}
                        setViewedBuildPages={setViewedBuildPages}
                        setCurrentPage={setCurrentPage}
                        setNoResult={setNoResult}
                        perPage={perPage}
                        strings={strings}
                        project={project}
                        selectedVersion={selectedVersion}
                    />
                    <VersionSelectorElement
                        selectedVersion={selectedVersion}
                        setSelectedVersion={setSelectedVersion}
                        software={project}
                    />
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-separate border-spacing-0 rounded-lg overflow-hidden">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-200 dark:text-gray-300 rounded-xl">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                {strings['downloadSoftware.build.name']}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 hidden md:table-cell"
                            >
                                <div className="flex items-center">
                                    {strings['downloadSoftware.build.sha256']}
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 hidden md:table-cell"
                            >
                                <div className="flex items-center">
                                    {strings['downloadSoftware.build.date']}
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 hidden md:table-cell"
                            >
                                <div className="flex items-center">
                                    {project === Project.Mohist
                                        ? strings[
                                              'downloadSoftware.build.forgever'
                                          ]
                                        : project === Project.Youer
                                          ? strings[
                                                'downloadSoftware.build.neoforgever'
                                            ]
                                          : 'N/A'}
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 hidden md:table-cell"
                            >
                                <span className="sr-only">
                                    {strings['button.download']}
                                </span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">
                                    {strings['social.github']}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewedBuildPages.length > 0 &&
                            viewedBuildPages[currentPage].map((build, index) =>
                                TableBuildElement({
                                    build,
                                    isLatest:
                                        build === originalBuildPages[0][0],
                                    project: project as Project,
                                    projectVersion: selectedVersion as string,
                                    indexOnPage: index,
                                    strings,
                                    setOpenModal,
                                    setModalBuild,
                                }),
                            )}
                    </tbody>
                </table>
                {viewedBuildPages.length === 0 && !noResult && !noBuild && (
                    <div className="flex justify-center mt-4">
                        <LoadingParagraph />
                    </div>
                )}
                {noResult && (
                    <div className="flex justify-center mt-4">
                        <p className="text-gray-500 dark:text-gray-400">
                            {strings['downloadSoftware.search.noresults']}
                        </p>
                    </div>
                )}
                {noBuild && (
                    <div className="flex justify-center mt-4">
                        <p className="text-gray-500 dark:text-gray-400">
                            {strings['downloadSoftware.search.nobuilds']}
                        </p>
                    </div>
                )}
                <NavigationTableElement
                    buildPages={viewedBuildPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </section>
    )
}

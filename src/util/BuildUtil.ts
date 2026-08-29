import { BuildDto } from '@/dto/Build'
import { Project } from '@/dto/Project'
import { getAPIEndpoint } from '@/util/Environment'

const ADFOCUS_PREFIX = 'https://adfoc.us/serve/sitelinks/?id=765928&url='

export interface LoaderVersion {
    name: string
    version: string
}

export const shortHash = (hash?: string): string => hash?.substring(0, 8) ?? ''

/**
 * A build may ship several loaders: Mohist targets Forge and NeoForge on some versions.
 */
export const loaderVersions = (build: BuildDto): LoaderVersion[] => {
    const versions: LoaderVersion[] = []

    if (build.loader?.forge_version)
        versions.push({ name: 'Forge', version: build.loader.forge_version })
    if (build.loader?.neoforge_version)
        versions.push({
            name: 'NeoForge',
            version: build.loader.neoforge_version,
        })

    return versions
}

export const loaderLabel = (build: BuildDto): string =>
    loaderVersions(build)
        .map((loader) => `${loader.name} ${loader.version}`)
        .join(' · ')

/**
 * True when this build is the first one to ship its loader versions, `older` being the build
 * released just before it. Used to flag the builds worth upgrading for.
 */
export const isLoaderBump = (build: BuildDto, older?: BuildDto): boolean => {
    const label = loaderLabel(build)
    return !!older && label.length > 0 && label !== loaderLabel(older)
}

export const buildDownloadUrl = (
    project: Project,
    projectVersion: string,
    buildId: number,
): string =>
    `${getAPIEndpoint()}/project/${project}/${projectVersion}/builds/${buildId}/download`

export const sponsoredDownloadUrl = (
    project: Project,
    projectVersion: string,
    buildId: number,
): string =>
    `${ADFOCUS_PREFIX}${buildDownloadUrl(project, projectVersion, buildId)}`

/** Always resolves to the newest build, which is what a scripted download wants. */
export const latestDownloadUrl = (
    project: Project,
    projectVersion: string,
): string =>
    `${getAPIEndpoint()}/project/${project}/${projectVersion}/builds/latest/download`

export const downloadCommand = (
    project: Project,
    projectVersion: string,
): string =>
    `curl -fL -o ${project}.jar ${latestDownloadUrl(project, projectVersion)}`

/**
 * Orders versions newest first. Segments are compared as numbers so 1.20.1 sorts above 1.7.10,
 * which a plain string sort gets wrong.
 */
export const compareVersionsDesc = (a: string, b: string): number => {
    const left = a.split('.')
    const right = b.split('.')

    for (let i = 0; i < Math.max(left.length, right.length); i++) {
        const x = Number(left[i] ?? 0)
        const y = Number(right[i] ?? 0)

        // Fall back to a text comparison on anything that is not a plain number.
        if (Number.isNaN(x) || Number.isNaN(y))
            return (right[i] ?? '').localeCompare(left[i] ?? '')

        if (x !== y) return y - x
    }

    return 0
}

export const commitUrl = (project: Project, commitHash: string): string =>
    `https://github.com/MohistMC/${project}/commit/${commitHash}`

/** Midnight of the build's day, used to group the timeline. */
export const dayKey = (isoDate: string): number => {
    const date = new Date(isoDate)
    date.setHours(0, 0, 0, 0)
    return date.getTime()
}

export interface BuildDay {
    key: number
    builds: BuildDto[]
}

/**
 * Groups builds into consecutive days, preserving the order the API returned them in
 * (most recent first).
 */
export const groupByDay = (builds: BuildDto[]): BuildDay[] => {
    const days: BuildDay[] = []

    for (const build of builds) {
        const key = dayKey(build.build_date)
        const last = days[days.length - 1]

        if (last?.key === key) last.builds.push(build)
        else days.push({ key, builds: [build] })
    }

    return days
}

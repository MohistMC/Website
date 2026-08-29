import { BuildDto } from '@/dto/Build'
import { Project } from '@/dto/Project'
import { downloadCommand, loaderLabel, shortHash } from '@/util/BuildUtil'
import { getTimeAgoInText } from '@/util/DateUtil'
import { formatString } from '@/util/LocaleHelper'
import CopyField from '@/components/downloadSoftware/CopyField'
import DownloadDropdown from '@/components/downloadSoftware/DownloadDropdown'

interface LatestBuildCardProps {
    build: BuildDto
    project: Project
    projectVersion: string
    strings: Record<string, string>
}

/**
 * Answers the most common visit — "give me the current jar for my Minecraft version" — without
 * making anyone read the history below.
 */
export default function LatestBuildCard({
    build,
    project,
    projectVersion,
    strings,
}: LatestBuildCardProps) {
    const loader = loaderLabel(build)

    return (
        <div className="w-full rounded-xl border border-blue-200 border-t-[3px] border-t-blue-600 bg-white p-5 dark:border-blue-900 dark:border-t-blue-500 dark:bg-dark-100 md:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-400">
                    {strings['downloadSoftware.latest.badge']}
                </span>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                    {formatString(
                        strings['downloadSoftware.builtAgo'],
                        getTimeAgoInText(new Date(build.build_date), strings),
                    )}
                </span>
            </div>

            <p className="mb-1.5 font-mono text-2xl font-bold text-gray-900 dark:text-white">
                {shortHash(build.commit.hash)}
            </p>
            <p className="mb-1 max-w-prose text-gray-900 dark:text-gray-100">
                {build.commit.changelog}
            </p>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                {formatString(
                    strings['downloadSoftware.byAuthor'],
                    build.commit.author,
                )}
                {loader && ` · ${loader}`}
            </p>

            <div className="mb-4">
                <DownloadDropdown
                    build={build}
                    project={project}
                    projectVersion={projectVersion}
                    strings={strings}
                    label={strings['button.download']}
                />
            </div>

            <div className="flex flex-col gap-2.5">
                <CopyField
                    label="SHA256"
                    value={build.file_sha256}
                    copyLabel={strings['button.copy']}
                    copiedMessage={strings['toast.sha256.copied']}
                />
                <CopyField
                    label="$"
                    value={downloadCommand(project, projectVersion)}
                    copyLabel={strings['button.copy']}
                    copiedMessage={strings['toast.command.copied']}
                />
            </div>
        </div>
    )
}

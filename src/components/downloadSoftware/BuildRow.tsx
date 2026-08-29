import { BuildDto } from '@/dto/Build'
import { Project } from '@/dto/Project'
import { loaderLabel, shortHash } from '@/util/BuildUtil'
import { getTimeAgoInText } from '@/util/DateUtil'
import DownloadDropdown from '@/components/downloadSoftware/DownloadDropdown'

interface BuildRowProps {
    build: BuildDto
    project: Project
    projectVersion: string
    strings: Record<string, string>
    isLoaderBump: boolean
    isSelected: boolean
    onOpenDetails: (build: BuildDto) => void
    onToggleSelected: (build: BuildDto) => void
}

export default function BuildRow({
    build,
    project,
    projectVersion,
    strings,
    isLoaderBump,
    isSelected,
    onOpenDetails,
    onToggleSelected,
}: BuildRowProps) {
    const loader = loaderLabel(build)

    return (
        <div className="relative flex flex-wrap items-center gap-3 rounded-lg py-3 pl-7 pr-3 hover:bg-white dark:hover:bg-dark-100">
            <span
                className={`absolute left-px top-5 h-2.5 w-2.5 rounded-full border-2 border-gray-100 dark:border-dark-50 ${
                    isSelected
                        ? 'bg-blue-600 dark:bg-blue-500'
                        : 'bg-gray-300 dark:bg-dark-300'
                }`}
                aria-hidden="true"
            />

            <button
                type="button"
                onClick={() => onOpenDetails(build)}
                title={strings['downloadSoftware.seemore']}
                className="min-w-0 flex-1 basis-72 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-50"
            >
                <p className="truncate text-gray-900 dark:text-gray-100">
                    {build.commit.changelog}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-mono text-gray-600 dark:text-gray-300">
                        {shortHash(build.commit.hash)}
                    </span>
                    {` · ${build.commit.author} · ${getTimeAgoInText(new Date(build.build_date), strings)}`}
                </span>
            </button>

            <div className="ml-auto flex flex-wrap items-center gap-2">
                {loader && (
                    <span
                        title={
                            isLoaderBump
                                ? strings['downloadSoftware.loader.bump']
                                : undefined
                        }
                        className={`whitespace-nowrap rounded-md border px-2 py-0.5 font-mono text-[11px] ${
                            isLoaderBump
                                ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-400'
                                : 'border-gray-200 bg-gray-50 text-gray-500 dark:border-dark-200 dark:bg-dark-25 dark:text-gray-400'
                        }`}
                    >
                        {isLoaderBump && '↑ '}
                        {loader}
                    </span>
                )}

                <button
                    type="button"
                    onClick={() => onToggleSelected(build)}
                    className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isSelected
                            ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                            : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 dark:border-dark-300 dark:text-gray-400 dark:hover:text-blue-400'
                    }`}
                >
                    {isSelected
                        ? strings['downloadSoftware.iuse.selected']
                        : strings['downloadSoftware.iuse']}
                </button>

                <DownloadDropdown
                    build={build}
                    project={project}
                    projectVersion={projectVersion}
                    strings={strings}
                    label=".jar"
                    variant="compact"
                />
            </div>
        </div>
    )
}

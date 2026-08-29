import { forwardRef } from 'react'
import { BuildDto } from '@/dto/Build'
import { Project } from '@/dto/Project'
import DownloadDropdown from '@/components/downloadSoftware/DownloadDropdown'
import { loaderLabel, shortHash } from '@/util/BuildUtil'
import { formatString } from '@/util/LocaleHelper'

interface CompareBannerProps {
    builds: BuildDto[]
    currentHash: string
    project: Project
    projectVersion: string
    strings: Record<string, string>
    onClear: () => void
}

/**
 * Answers "is it worth updating?" by listing the commits between the build someone runs and the
 * newest one. Stays inline rather than in a modal: people read it while scanning the timeline
 * and often pick another build straight after.
 */
const CompareBanner = forwardRef<HTMLDivElement, CompareBannerProps>(
    function CompareBanner(
        { builds, currentHash, project, projectVersion, strings, onClear },
        ref,
    ) {
        const index = builds.findIndex(
            (build) => build.commit.hash === currentHash,
        )
        if (index < 0) return null

        const behind = builds.slice(0, index)
        const mine = builds[index]
        const latest = builds[0]
        const loaderChanged =
            loaderLabel(mine) !== loaderLabel(latest) &&
            loaderLabel(latest).length > 0

        return (
            <div
                ref={ref}
                className="w-full rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-500/40 dark:bg-blue-500/10 md:p-5"
            >
                {behind.length === 0 ? (
                    <>
                        <p className="font-bold text-gray-900 dark:text-white">
                            {strings['downloadSoftware.compare.uptodate']}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatString(
                                strings[
                                    'downloadSoftware.compare.uptodate.desc'
                                ],
                                shortHash(currentHash),
                            )}
                        </p>
                    </>
                ) : (
                    <>
                        <p className="font-bold text-gray-900 dark:text-white">
                            {behind.length === 1
                                ? strings['downloadSoftware.compare.behind.one']
                                : formatString(
                                      strings[
                                          'downloadSoftware.compare.behind'
                                      ],
                                      behind.length,
                                  )}
                        </p>
                        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                            {formatString(
                                strings['downloadSoftware.compare.since'],
                                shortHash(currentHash),
                            )}
                        </p>

                        {loaderChanged && (
                            <p className="mb-3 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-blue-500/40 dark:bg-dark-50 dark:text-gray-100">
                                {formatString(
                                    strings[
                                        'downloadSoftware.compare.loaderChanged'
                                    ],
                                    loaderLabel(mine),
                                    loaderLabel(latest),
                                )}
                            </p>
                        )}

                        <ul className="mb-4 flex max-h-44 flex-col gap-1.5 overflow-y-auto">
                            {behind.map((build) => (
                                <li
                                    key={build.commit.hash}
                                    className="flex gap-3 text-sm text-gray-600 dark:text-gray-400"
                                >
                                    <span className="shrink-0 font-mono text-blue-600 dark:text-blue-400">
                                        {shortHash(build.commit.hash)}
                                    </span>
                                    <span className="min-w-0">
                                        {build.commit.changelog}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <div className="flex flex-wrap gap-2">
                    {behind.length > 0 && (
                        <DownloadDropdown
                            build={latest}
                            project={project}
                            projectVersion={projectVersion}
                            strings={strings}
                            label={strings['downloadSoftware.compare.update']}
                        />
                    )}
                    <button
                        type="button"
                        onClick={onClear}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-dark-300 dark:text-gray-400 dark:hover:text-white"
                    >
                        {strings['button.close']}
                    </button>
                </div>
            </div>
        )
    },
)

export default CompareBanner

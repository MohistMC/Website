import { Dropdown } from 'flowbite-react'
import { HiDownload, HiOutlineCloudDownload } from 'react-icons/hi'
import { BuildDto } from '@/dto/Build'
import { Project } from '@/dto/Project'
import { buildDownloadUrl, sponsoredDownloadUrl } from '@/util/BuildUtil'

interface DownloadDropdownProps {
    build: BuildDto
    project: Project
    projectVersion: string
    strings: Record<string, string>
    label: string
    /** `compact` is the outlined trigger used inside timeline rows. */
    variant?: 'primary' | 'compact'
}

/**
 * The two download routes behind a single control, used by the latest build card, the timeline
 * rows and the details modal.
 */
export default function DownloadDropdown({
    build,
    project,
    projectVersion,
    strings,
    label,
    variant = 'primary',
}: DownloadDropdownProps) {
    const items = (
        <>
            <a
                href={sponsoredDownloadUrl(project, projectVersion, build.id)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-dark-200"
            >
                <HiDownload className="h-4 w-4 shrink-0 text-orange-500" />
                {strings['button.download']}
            </a>
            <a
                href={buildDownloadUrl(project, projectVersion, build.id)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white"
            >
                <HiOutlineCloudDownload className="h-4 w-4 shrink-0" />
                {strings['button.download.mirror']}
            </a>
        </>
    )

    if (variant === 'compact')
        return (
            <Dropdown
                label={label}
                dismissOnClick={true}
                className="w-56 py-1"
                renderTrigger={() => (
                    <button
                        type="button"
                        className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-dark-300 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
                    >
                        {label}
                        <svg
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            >
                {items}
            </Dropdown>
        )

    return (
        <Dropdown label={label} dismissOnClick={true} className="w-56 py-1">
            {items}
        </Dropdown>
    )
}

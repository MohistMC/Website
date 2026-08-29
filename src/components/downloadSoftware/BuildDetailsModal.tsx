import { Flowbite, Modal } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/features/theme/ThemeSlice'
import { useAppSelector } from '@/util/redux/Hooks'
import {
    selectLocale,
    selectTranslations,
} from '@/features/i18n/TranslatorSlice'
import { customTheme } from '@/util/Theme'
import { BuildDto } from '@/dto/Build'
import { Project } from '@/dto/Project'
import { commitUrl, loaderLabel, shortHash } from '@/util/BuildUtil'
import ProfileImage from '@/components/ProfileImage'
import CopyField from '@/components/downloadSoftware/CopyField'
import DownloadDropdown from '@/components/downloadSoftware/DownloadDropdown'

interface BuildDetailsModalProps {
    build: BuildDto | undefined
    project: Project | undefined
    projectVersion: string | undefined
    open: boolean
    onClose: () => void
}

function Fact({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex min-w-0 flex-col">
            <dt className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {label}
            </dt>
            <dd className="text-sm text-gray-900 dark:text-gray-100">
                {value}
            </dd>
        </div>
    )
}

export default function BuildDetailsModal({
    build,
    project,
    projectVersion,
    open,
    onClose,
}: BuildDetailsModalProps) {
    const mode = useSelector(selectTheme)
    const strings = useAppSelector(selectTranslations)
    const locale = useAppSelector(selectLocale)

    if (!build || !project || !projectVersion) return null

    const absolute = (date: string) => new Date(date).toLocaleString(locale)
    const loader = loaderLabel(build)

    return (
        <Flowbite theme={{ theme: customTheme, mode }}>
            <Modal dismissible show={open} onClose={onClose}>
                <Modal.Header>
                    <span className="font-mono">
                        {shortHash(build.commit.hash)}
                    </span>
                </Modal.Header>

                <Modal.Body>
                    <div className="flex flex-col gap-5">
                        <div className="flex items-start gap-3">
                            <ProfileImage
                                name={build.commit.author}
                                githubUrl={`https://github.com/${build.commit.author}`}
                                size={10}
                            />
                            <div className="min-w-0">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {build.commit.changelog}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {`${build.commit.author} · ${absolute(build.commit.commit_date)}`}
                                </p>
                            </div>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-5 gap-y-3.5">
                            <Fact
                                label={strings['downloadSoftware.build.date']}
                                value={absolute(build.build_date)}
                            />
                            <Fact
                                label={strings['downloadSoftware.build.id']}
                                value={`#${build.id}`}
                            />
                            {loader && (
                                <Fact
                                    label={
                                        strings['downloadSoftware.build.loader']
                                    }
                                    value={loader}
                                />
                            )}
                        </dl>

                        <div>
                            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {strings['downloadSoftware.build.commit']}
                            </p>
                            <CopyField
                                value={build.commit.hash}
                                copyLabel={strings['button.copy']}
                                copiedMessage={strings['toast.commit.copied']}
                            />
                        </div>

                        <div>
                            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {strings['downloadSoftware.build.sha256']}
                            </p>
                            <CopyField
                                value={build.file_sha256}
                                copyLabel={strings['button.copy']}
                                copiedMessage={strings['toast.sha256.copied']}
                            />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <DownloadDropdown
                        build={build}
                        project={project}
                        projectVersion={projectVersion}
                        strings={strings}
                        label={strings['button.download']}
                    />
                    <a
                        href={commitUrl(project, build.commit.hash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-dark-300 dark:text-gray-300 dark:hover:bg-dark-200"
                    >
                        {strings['downloadSoftware.build.viewOnGithub']}
                    </a>
                </Modal.Footer>
            </Modal>
        </Flowbite>
    )
}

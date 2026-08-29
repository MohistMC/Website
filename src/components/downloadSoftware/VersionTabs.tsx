interface VersionTabsProps {
    versions: string[]
    selectedVersion: string | undefined
    setSelectedVersion: (version: string) => void
    label: string
}

/**
 * The Minecraft version is the first choice a visitor makes, so it sits above everything else
 * rather than inside a toolbar dropdown.
 */
export default function VersionTabs({
    versions,
    selectedVersion,
    setSelectedVersion,
    label,
}: VersionTabsProps) {
    return (
        <div className="w-full">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                {label}
            </p>
            <div className="flex flex-wrap gap-2" role="tablist">
                {versions.map((version) => {
                    const selected = version === selectedVersion

                    return (
                        <button
                            key={version}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            onClick={() => setSelectedVersion(version)}
                            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-25 ${
                                selected
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-gray-300 bg-white text-gray-600 hover:border-blue-500 hover:text-gray-900 dark:border-dark-300 dark:bg-dark-100 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:text-white'
                            }`}
                        >
                            {version}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

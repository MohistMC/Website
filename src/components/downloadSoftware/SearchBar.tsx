import { RefObject } from 'react'

export interface SearchOptions {
    caseSensitive: boolean
    wholeWord: boolean
    useRegex: boolean
}

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    options: SearchOptions
    onToggle: (option: keyof SearchOptions) => void
    invalidRegex: boolean
    strings: Record<string, string>
    inputRef: RefObject<HTMLInputElement>
}

interface ToggleProps {
    label: string
    title: string
    active: boolean
    onClick: () => void
}

function Toggle({ label, title, active, onClick }: ToggleProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            aria-label={title}
            aria-pressed={active}
            className={`h-6 w-6 shrink-0 rounded font-mono text-[11px] leading-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                active
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white'
            }`}
        >
            {label}
        </button>
    )
}

export default function SearchBar({
    value,
    onChange,
    options,
    onToggle,
    invalidRegex,
    strings,
    inputRef,
}: SearchBarProps) {
    return (
        <div>
            <div
                className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2 focus-within:border-blue-500 dark:bg-dark-100 ${
                    invalidRegex
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-dark-300'
                }`}
            >
                <span aria-hidden="true" className="text-gray-400">
                    ⌕
                </span>

                <input
                    ref={inputRef}
                    type="search"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={strings['downloadSoftware.search.placeholder']}
                    className="min-w-0 flex-1 border-none bg-transparent p-0 text-sm text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-white"
                />

                <Toggle
                    label="Aa"
                    title={strings['downloadSoftware.search.caseSensitive']}
                    active={options.caseSensitive}
                    onClick={() => onToggle('caseSensitive')}
                />
                <Toggle
                    label="ab"
                    title={strings['downloadSoftware.search.wholeWord']}
                    active={options.wholeWord}
                    onClick={() => onToggle('wholeWord')}
                />
                <Toggle
                    label=".*"
                    title={strings['downloadSoftware.search.regex']}
                    active={options.useRegex}
                    onClick={() => onToggle('useRegex')}
                />

                <kbd className="hidden shrink-0 rounded border border-gray-300 px-1.5 font-mono text-[10px] text-gray-400 dark:border-dark-300 sm:block">
                    /
                </kbd>
            </div>

            {invalidRegex && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {strings['downloadSoftware.search.regex.invalid']}
                </p>
            )}
        </div>
    )
}

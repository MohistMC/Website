import { ToastLogger } from '@/util/Logger'

interface CopyFieldProps {
    label?: string
    value: string
    copiedMessage: string
    copyLabel: string
}

/**
 * A long technical value with a copy button. Only the value scrolls: the button stays reachable
 * on narrow screens, which it would not be inside the scrolling area.
 */
export default function CopyField({
    label,
    value,
    copiedMessage,
    copyLabel,
}: CopyFieldProps) {
    const copy = () => {
        navigator.clipboard
            .writeText(value)
            .then(() => ToastLogger.info(copiedMessage))
            .catch(() => undefined)
    }

    return (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 dark:border-dark-200 dark:bg-dark-25">
            <span className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto">
                {label && (
                    <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500">
                        {label}
                    </span>
                )}
                <span className="whitespace-nowrap font-mono text-xs text-gray-600 dark:text-gray-300">
                    {value}
                </span>
            </span>
            <button
                type="button"
                onClick={copy}
                className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-blue-400 dark:hover:bg-dark-200"
            >
                {copyLabel}
            </button>
        </div>
    )
}

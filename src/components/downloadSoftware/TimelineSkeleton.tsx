export default function TimelineSkeleton() {
    return (
        <div role="status" className="w-full animate-pulse">
            <span className="sr-only">Loading…</span>

            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-200 dark:bg-dark-100">
                <div className="mb-4 h-4 w-28 rounded-full bg-gray-200 dark:bg-dark-300" />
                <div className="mb-3 h-6 w-40 rounded-full bg-gray-300 dark:bg-dark-200" />
                <div className="mb-2 h-3 w-full max-w-md rounded-full bg-gray-200 dark:bg-dark-300" />
                <div className="mb-6 h-3 w-56 rounded-full bg-gray-200 dark:bg-dark-300" />
                <div className="h-10 w-44 rounded-lg bg-gray-300 dark:bg-dark-200" />
            </div>

            {[0, 1, 2, 3, 4].map((row) => (
                <div key={row} className="flex items-center gap-3 py-4 pl-7">
                    <div className="flex-1">
                        <div className="mb-2 h-3 w-full max-w-sm rounded-full bg-gray-300 dark:bg-dark-200" />
                        <div className="h-2.5 w-48 rounded-full bg-gray-200 dark:bg-dark-300" />
                    </div>
                    <div className="hidden h-7 w-32 rounded-md bg-gray-200 dark:bg-dark-300 sm:block" />
                </div>
            ))}
        </div>
    )
}

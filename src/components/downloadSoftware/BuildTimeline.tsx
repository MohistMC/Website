import { useEffect, useMemo, useRef } from 'react'
import { BuildDto } from '@/dto/Build'
import { Project } from '@/dto/Project'
import { groupByDay, isLoaderBump } from '@/util/BuildUtil'
import { formatString } from '@/util/LocaleHelper'
import BuildRow from '@/components/downloadSoftware/BuildRow'

interface BuildTimelineProps {
    builds: BuildDto[]
    allBuilds: BuildDto[]
    project: Project
    projectVersion: string
    strings: Record<string, string>
    locale: string
    selectedHash: string | undefined
    onOpenDetails: (build: BuildDto) => void
    onToggleSelected: (build: BuildDto) => void
    onReachEnd: () => void
    hasMore: boolean
}

/**
 * Builds are a chronology, so they are grouped by day and loaded as the reader scrolls rather
 * than cut into numbered pages.
 */
export default function BuildTimeline({
    builds,
    allBuilds,
    project,
    projectVersion,
    strings,
    locale,
    selectedHash,
    onOpenDetails,
    onToggleSelected,
    onReachEnd,
    hasMore,
}: BuildTimelineProps) {
    const sentinel = useRef<HTMLDivElement>(null)
    const days = useMemo(() => groupByDay(builds), [builds])

    useEffect(() => {
        const node = sentinel.current
        if (!node || !hasMore) return

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) onReachEnd()
        })

        observer.observe(node)
        return () => observer.disconnect()
    }, [hasMore, onReachEnd])

    const dayLabel = (key: number): string => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const days = Math.round((today.getTime() - key) / 86400000)

        if (days <= 0) return strings['downloadSoftware.day.today']
        if (days === 1) return strings['downloadSoftware.day.yesterday']
        if (days < 7)
            return formatString(strings['downloadSoftware.day.ago'], days)

        return new Date(key).toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }

    return (
        <div className="relative w-full">
            <span
                className="absolute bottom-1 left-[5px] top-1 w-0.5 bg-gray-200 dark:bg-dark-200"
                aria-hidden="true"
            />

            {days.map((day) => (
                <section key={day.key}>
                    <h3 className="py-2 pl-7 pt-5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {dayLabel(day.key)}
                    </h3>

                    {day.builds.map((build) => {
                        const index = allBuilds.indexOf(build)

                        return (
                            <BuildRow
                                key={build.commit.hash}
                                build={build}
                                project={project}
                                projectVersion={projectVersion}
                                strings={strings}
                                isLoaderBump={isLoaderBump(
                                    build,
                                    allBuilds[index + 1],
                                )}
                                isSelected={selectedHash === build.commit.hash}
                                onOpenDetails={onOpenDetails}
                                onToggleSelected={onToggleSelected}
                            />
                        )
                    })}
                </section>
            ))}

            {hasMore && <div ref={sentinel} className="h-8" />}
        </div>
    )
}

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Tooltip } from '../Tooltip'

type MeterSegmentPattern = 'striped'

interface MeterSegment {
  value: number
  variant?: 'primary' | 'error'
  pattern?: MeterSegmentPattern
  label: string
}

interface MeterMarker {
  at: number
  label: string
}

interface MeterProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'role'
> {
  max: number
  segments: MeterSegment[]
  marker?: MeterMarker
  formatValue?: (value: number) => string
}

const defaultFormatValue = (value: number) => String(value)

const buildAriaLabel = (
  segments: MeterSegment[],
  max: number,
  formatValue: (value: number) => string
): string => {
  const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0)
  const remaining = Math.max(0, max - total)
  const parts = segments
    .filter(s => s.value > 0)
    .map(s => `${formatValue(s.value)} ${s.label}`)
  parts.push(`of a ${formatValue(max)} limit`)
  if (remaining > 0) {
    parts.push(`${formatValue(remaining)} left`)
  } else if (total > max) {
    parts.push(`${formatValue(total - max)} over limit`)
  }
  return parts.join(', ').replace(/, ([^,]*)$/, '. $1.')
}

const segmentColors: Record<string, { bg: string; overflow: string }> = {
  primary: {
    bg: 'bg-accent dark:bg-accent-dark',
    overflow: 'bg-feedback-error dark:bg-feedback-error-dark'
  },
  error: {
    bg: 'bg-feedback-error dark:bg-feedback-error-dark',
    overflow: 'bg-feedback-error dark:bg-feedback-error-dark'
  }
}

const Meter = React.forwardRef<HTMLDivElement, MeterProps>(
  (
    {
      className,
      max,
      segments,
      marker,
      formatValue = defaultFormatValue,
      ...props
    },
    ref
  ) => {
    const safeMax = Math.max(0, max)
    const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0)

    const ariaLabel =
      props['aria-label'] ?? buildAriaLabel(segments, safeMax, formatValue)

    const rendered: Array<{
      key: number
      width: number
      isOverflow: boolean
      segment: MeterSegment
    }> = []

    if (safeMax > 0) {
      let consumed = 0
      segments.forEach((segment, i) => {
        const value = Math.max(0, segment.value)
        if (value === 0) return

        const end = consumed + value
        if (consumed < safeMax) {
          const fitValue = Math.min(value, safeMax - consumed)
          rendered.push({
            key: i,
            width: (fitValue / safeMax) * 100,
            isOverflow: false,
            segment
          })
        }
        if (end > safeMax) {
          const overflowValue = end - Math.max(consumed, safeMax)
          rendered.push({
            key: -(i + 1),
            width: (overflowValue / safeMax) * 100,
            isOverflow: true,
            segment
          })
        }
        consumed = end
      })

      if (total > safeMax) {
        const scale = safeMax / total
        rendered.forEach(r => {
          r.width = r.width * scale
        })
      }
    }

    const markerAt = marker
      ? Math.max(0, Math.min(1, marker.at)) * 100
      : undefined

    return (
      <div
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        className={cn('relative', className)}
        {...props}
      >
        <div
          className={cn(
            'flex h-3 w-full overflow-hidden rounded-full',
            'bg-border dark:bg-border-dark',
            'forced-colors:border forced-colors:border-[CanvasText] forced-colors:bg-transparent'
          )}
        >
          {rendered.map(({ key, width, isOverflow, segment }) => {
            const colors =
              segmentColors[
                isOverflow ? 'error' : (segment.variant ?? 'primary')
              ]
            return (
              <span
                key={key}
                data-segment={segment.label}
                data-overflow={isOverflow || undefined}
                className={cn(
                  isOverflow ? colors.overflow : colors.bg,
                  segment.pattern === 'striped' && [
                    'bg-[length:8px_8px]',
                    'bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.4)_2px,rgba(255,255,255,0.4)_4px)]',
                    'forced-colors:bg-[repeating-linear-gradient(45deg,CanvasText,CanvasText_2px,Canvas_2px,Canvas_4px)]'
                  ],
                  !segment.pattern && 'forced-colors:bg-[CanvasText]'
                )}
                style={{ width: `${width}%` }}
              />
            )
          })}
        </div>
        {marker && markerAt != null && (
          <Tooltip content={marker.label} side="top">
            <button
              type="button"
              aria-label={marker.label}
              className={cn(
                'absolute top-1/2 -translate-x-1/2 -translate-y-1/2',
                'flex h-5 w-3 items-center justify-center',
                'cursor-default'
              )}
              style={{ left: `${markerAt}%` }}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'block h-5 w-0.5 rounded-full',
                  'bg-foreground dark:bg-foreground-dark',
                  'forced-colors:bg-[Highlight]'
                )}
              />
            </button>
          </Tooltip>
        )}
      </div>
    )
  }
)
Meter.displayName = 'Meter'

export {
  Meter,
  type MeterProps,
  type MeterSegment,
  type MeterSegmentPattern,
  type MeterMarker
}

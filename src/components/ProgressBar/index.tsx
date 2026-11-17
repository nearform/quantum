import * as React from 'react'
import { cn } from '../../lib/utils.ts'

type ProgressBarLabel =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-label'?: string; 'aria-labelledby': string }

type ProgressBarProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | 'role'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-valuenow'
  | 'aria-valuemin'
  | 'aria-valuemax'
  | 'children'
> &
  ProgressBarLabel & {
    value?: number | null
    min?: number
    max?: number
  }

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, min = 0, max = 100, ...props }, ref) => {
    const safeMax = Math.max(min, max)
    const indeterminate = value == null || Number.isNaN(value)
    const now = indeterminate
      ? undefined
      : Math.min(safeMax, Math.max(min, value))
    const percent =
      now === undefined || safeMax === min
        ? 0
        : ((now - min) / (safeMax - min)) * 100

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={safeMax}
        aria-valuenow={now}
        data-state={indeterminate ? 'indeterminate' : 'determinate'}
        className={cn(
          'relative h-1.5 w-full overflow-hidden rounded-full',
          'bg-grey-500 dark:bg-grey-500',
          'forced-colors:border forced-colors:border-[CanvasText] forced-colors:bg-transparent',
          className
        )}
        {...props}
      >
        {indeterminate ? (
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-y-0 left-0 w-2/5 rounded-full',
              'bg-accent dark:bg-accent-dark forced-colors:bg-[CanvasText]',
              'animate-progressIndeterminate',
              'motion-reduce:left-[30%] motion-reduce:animate-none'
            )}
          />
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-y-0 left-0 rounded-full',
              'bg-accent dark:bg-accent-dark forced-colors:bg-[CanvasText]',
              'transition-[width] duration-300 motion-reduce:transition-none'
            )}
            style={{ width: `${percent}%` }}
          />
        )}
      </div>
    )
  }
)
ProgressBar.displayName = 'ProgressBar'

export { ProgressBar, type ProgressBarProps }

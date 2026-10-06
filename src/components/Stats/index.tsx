import * as React from 'react'

import { type IconType } from '../../assets'
import { cn } from '../../lib/utils'

const Stats = React.forwardRef<
  HTMLDListElement,
  React.HTMLAttributes<HTMLDListElement>
>(({ className, ...props }, ref) => (
  <dl
    ref={ref}
    className={cn('flex flex-wrap items-center gap-x-4', className)}
    {...props}
  />
))
Stats.displayName = 'Stats'

interface StatProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  label: React.ReactNode
  value: React.ReactNode
  icon?: IconType
}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, label, value, icon: Icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex min-h-6 items-center gap-1.5 py-1',
        'text-xs leading-normal',
        className
      )}
      {...props}
    >
      <dt className="inline-flex items-center gap-1 text-foreground-muted dark:text-foreground-muted-dark">
        {Icon ? <Icon className="h-3 w-3 shrink-0" aria-hidden="true" /> : null}
        {label}
      </dt>
      <dd className="font-semibold text-foreground dark:text-foreground-dark">
        {value}
      </dd>
    </div>
  )
)
Stat.displayName = 'Stat'

export { Stats, Stat, type StatProps }

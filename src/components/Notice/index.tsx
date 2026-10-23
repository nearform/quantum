'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import {
  BsExclamationTriangleFill,
  BsInfoCircleFill,
  BsXLg,
  type IconType
} from '../../assets/index.ts'
import { cn } from '../../lib/utils.ts'

const focusClasses = [
  'outline-hidden',
  'focus-visible:shadow-brandGreen',
  'dark:focus-visible:shadow-brandGreen10'
]

const noticeVariants = cva(
  [
    'relative',
    'flex',
    'w-full',
    'items-center',
    'justify-center',
    'gap-2',
    'px-10',
    'py-2.5',
    'text-sm'
  ],
  {
    variants: {
      variant: {
        'warning-filled': [
          'bg-foreground',
          'text-foreground-inverse',
          'dark:bg-foreground-dark',
          'dark:text-foreground-inverse-dark'
        ],
        warning: [
          'border',
          'border-feedback-warning',
          'bg-background',
          'text-foreground',
          'dark:border-feedback-warning-dark',
          'dark:bg-background-dark',
          'dark:text-foreground-dark'
        ],
        'info-filled': [
          'bg-foreground',
          'text-foreground-inverse',
          'dark:bg-foreground-dark',
          'dark:text-foreground-inverse-dark'
        ],
        info: [
          'border',
          'border-border',
          'bg-background',
          'text-foreground',
          'dark:border-border-dark',
          'dark:bg-background-dark',
          'dark:text-foreground-dark'
        ]
      }
    },
    defaultVariants: {
      variant: 'info'
    }
  }
)

type NoticeVariant = NonNullable<VariantProps<typeof noticeVariants>['variant']>

const noticeIcons: Record<
  NoticeVariant,
  { icon: IconType; className: string }
> = {
  'warning-filled': {
    icon: BsExclamationTriangleFill,
    className: 'text-foreground-inverse dark:text-foreground-inverse-dark'
  },
  warning: {
    icon: BsExclamationTriangleFill,
    className: 'text-feedback-warning dark:text-feedback-warning-dark'
  },
  'info-filled': {
    icon: BsInfoCircleFill,
    className: 'text-foreground-inverse dark:text-foreground-inverse-dark'
  },
  info: {
    icon: BsInfoCircleFill,
    className: 'text-foreground-muted dark:text-foreground-muted-dark'
  }
}

interface NoticeProps
  extends
    Omit<React.ComponentPropsWithoutRef<'div'>, 'title'>,
    VariantProps<typeof noticeVariants> {
  /** Short heading. When set, the notice is left-aligned with the icon level with the title. */
  title?: React.ReactNode
  /** Text shown under the title, before any children. */
  description?: React.ReactNode
  /** Replaces the variant's icon. Pass `null` to show no icon. */
  icon?: React.ReactNode
  /** Called when the close button is clicked. Omit to hide the close button. */
  onDismiss?: () => void
  /** Accessible label for the close button. */
  dismissLabel?: string
}

const Notice = React.forwardRef<HTMLDivElement, NoticeProps>(
  (
    {
      className,
      variant,
      title,
      description,
      icon,
      onDismiss,
      dismissLabel = 'Dismiss',
      children,
      role = 'status',
      ...props
    },
    ref
  ) => {
    const resolved = variant ?? 'info'
    const { icon: Icon, className: iconClassName } = noticeIcons[resolved]

    const titled = title != null && title !== false && title !== ''

    const iconNode = icon !== null && (
      <span
        aria-hidden="true"
        className={cn(
          'flex',
          'shrink-0',
          'items-center',
          titled && 'h-5',
          '[&>svg]:h-3.5',
          '[&>svg]:w-3.5',
          iconClassName
        )}
      >
        {icon ?? <Icon />}
      </span>
    )

    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          noticeVariants({ variant: resolved }),
          titled && [
            'items-start',
            'justify-start',
            'px-4',
            onDismiss && 'pr-10'
          ],
          className
        )}
        {...props}
      >
        {titled ? (
          <div className="flex min-w-0 items-start gap-2">
            {iconNode}
            <div className="min-w-0 space-y-1">
              <div className="font-semibold">{title}</div>
              {description != null && <div>{description}</div>}
              {children != null && <div>{children}</div>}
            </div>
          </div>
        ) : (
          <div className="flex min-w-0 items-center justify-center gap-2">
            {iconNode}
            <div className="min-w-0">
              {description != null && <div>{description}</div>}
              {children}
            </div>
          </div>
        )}
        {onDismiss && (
          <button
            type="button"
            aria-label={dismissLabel}
            onClick={onDismiss}
            className={cn(
              'absolute',
              'right-3',
              titled ? 'top-2' : ['top-1/2', '-translate-y-1/2'],
              'flex',
              'h-6',
              'w-6',
              'shrink-0',
              'cursor-pointer',
              'items-center',
              'justify-center',
              'rounded-xs',
              'hover:bg-foreground/10',
              'dark:hover:bg-foreground-dark/10',
              '[&>svg]:h-3.5',
              '[&>svg]:w-3.5',
              ...focusClasses
            )}
          >
            <BsXLg aria-hidden="true" />
          </button>
        )}
      </div>
    )
  }
)

Notice.displayName = 'Notice'

export { Notice }
export type { NoticeProps, NoticeVariant }

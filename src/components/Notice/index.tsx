'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import {
  BsExclamationTriangleFill,
  BsInfoCircleFill,
  BsXLg,
  type IconType
} from '../../assets'
import { cn } from '../../lib/utils'

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
    React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof noticeVariants> {
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

    return (
      <div
        ref={ref}
        role={role}
        className={cn(noticeVariants({ variant: resolved }), className)}
        {...props}
      >
        <span className="flex items-center justify-center gap-2">
          {icon !== null && (
            <span
              aria-hidden="true"
              className={cn(
                'flex',
                'shrink-0',
                'items-center',
                '[&>svg]:h-3.5',
                '[&>svg]:w-3.5',
                iconClassName
              )}
            >
              {icon ?? <Icon />}
            </span>
          )}
          {children}
        </span>
        {onDismiss && (
          <button
            type="button"
            aria-label={dismissLabel}
            onClick={onDismiss}
            className={cn(
              'absolute',
              'right-3',
              'top-1/2',
              '-translate-y-1/2',
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

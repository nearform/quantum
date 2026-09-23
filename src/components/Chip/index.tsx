import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { BsPlus } from '@/assets'

const chipVariants = cva(
  [
    [
      'inline-flex',
      'rounded-full',
      'shrink-0',
      'items-center',
      'justify-center',
      'border border-2',
      'font-semibold',
      'leading-normal',
      'text-foreground',
      'focus-visible:outline-hidden',
      'focus-visible:shadow-blue'
    ],
    [
      'disabled:border-none',
      'disabled:text-foreground-subtle',
      'disabled:bg-background-subtle',
      'dark:disabled:bg-background-subtle-dark',
      'dark:disabled:text-foreground-subtle-dark'
    ],
    [
      'data-[active]:bg-foreground',
      'data-[active]:border-none',
      'data-[active]:text-foreground-inverse',
      'dark:data-[active]:bg-foreground-dark',
      'dark:data-[active]:text-foreground-inverse-dark'
    ]
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-brandGrey-10',
          'text-brandMidnight-100',
          'border-brandGrey-10'
        ],
        warning: [
          'bg-feedback-warning10',
          'text-feedback-warning',
          'border-feedback-warning10'
        ],
        success: [
          'bg-feedback-success10',
          'text-feedback-success',
          'border-feedback-success10'
        ],
        error: [
          'bg-feedback-danger10',
          'text-feedback-danger',
          'border-feedback-danger10'
        ],
        info: [
          'bg-brandBlue-10',
          'text-brandMidnight-100',
          'border-brandBlue-10'
        ]
      },
      size: {
        default: ['text-xs', 'px-2.5', 'py-2 h-[26px]', 'gap-1'],
        lg: ['text-sm', 'pl-4', 'pr-3', 'py-1.5', 'h-[33px]', 'gap-1.5']
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface ChipProps
  extends React.ComponentPropsWithRef<'button'>,
    VariantProps<typeof chipVariants> {
  active?: boolean
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    { variant, size, children, disabled, onClick, active, type, ...props },
    ref
  ) => {
    return (
      <button
        type={type ?? 'button'}
        onClick={onClick}
        data-active={active || undefined}
        aria-pressed={active === undefined ? undefined : active}
        className={cn(chipVariants({ variant, size }))}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
        <div
          aria-hidden="true"
          className="flex items-center justify-center w-6 h-6 p-2.5"
        >
          <BsPlus
            className={cn(size == 'lg' ? 'h-4 w-4' : 'h-3 w-3', [
              'stroke-current',
              'shrink-0'
            ])}
          />
        </div>
      </button>
    )
  }
)

Chip.displayName = 'Chip'

export { Chip, ChipProps }

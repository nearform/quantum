import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Plus } from '@/assets'

const chipVariants = cva(
  [
    [
      'inline-flex',
      'rounded-full',
      'shrink-0',
      'items-center',
      'justify-center',
      'border border-[2px]',
      'font-semibold',
      'leading-normal',
      'text-foreground'
    ],
    [
      'disabled:border-none',
      'disabled:text-foreground-subtle',
      'disabled:bg-background-subtle',
      'dark:disabled:bg-background-subtle-dark',
      'dark:disabled:text-foreground-subtle-dark'
    ]
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-background',
          'border-border-subtle',
          'dark:bg-background-dark',
          'dark:border-border-subtle-dark',
          'dark:text-foreground-dark'
        ],
        warning: ['bg-yellow-50', 'border-feedback-yellow'],
        success: ['bg-green-50', 'border-feedback-green'],
        error: ['bg-red-50', 'border-feedback-red'],
        info: ['bg-blue-50', 'border-primary-600', 'dark:border-primary-600'],
        active: [
          'bg-foreground',
          'border-none',
          'text-foreground-inverse',
          'dark:bg-foreground-dark',
          'dark:text-foreground-inverse-dark'
        ]
      },
      size: {
        default: ['text-xs', 'px-[10px]', 'py-[8px] h-[26px]', 'gap-[4px]'],
        lg: [
          'text-sm',
          'pl-[16px]',
          'pr-[12px]',
          'py-[6px]',
          'h-[33px]',
          'gap-[6px]'
        ]
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
    VariantProps<typeof chipVariants> {}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    { className, variant, size, children, disabled, onClick, ...props },
    ref
  ) => {
    return (
      <button
        onClick={onClick}
        className={cn(chipVariants({ variant, size }))}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
        <div className="flex items-center justify-center w-[24px] h-[24px] p-[10px]">
          <Plus
            className={cn(
              size == 'lg' ? 'h-[16px] w-[16px]' : 'h-[12px] w-[12px]',
              ['stroke-current', 'shrink-0']
            )}
          />
        </div>
      </button>
    )
  }
)

export { Chip, ChipProps }

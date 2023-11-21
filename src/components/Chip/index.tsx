import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Plus } from '@/assets'

const chipVariants = cva(
  [
    'inline-flex',
    'rounded-full',
    'gap-[4px]',
    'shrink-0',
    'items-center',
    'justify-center',
    'px-[10px]',
    'border border-[2px]',
    'font-semibold',
    'leading-normal',
    'text-foreground',
    'data-[disabled]:border-none',
    'data-[disabled]:text-foreground-subtle',
    'data-[disabled]:bg-background-subtle'
  ],
  {
    variants: {
      variant: {
        default: ['bg-background', 'border-border-subtle'],
        warning: ['bg-yellow-50', 'border-feedback-yellow'],
        success: ['bg-green-50', 'border-feedback-green'],
        error: ['bg-red-50', 'border-feedback-red'],
        info: ['bg-blue-50', 'border-primary-600'],
        active: ['bg-foreground', 'border-none', 'text-foreground-inverse']
      },
      size: {
        default: ['text-xs'],
        lg: []
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface ChipProps
  extends React.ComponentPropsWithRef<'div'>,
    VariantProps<typeof chipVariants> {
  disabled?: boolean
  onClick: () => void
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    { className, variant, size, children, disabled, onClick, ...props },
    ref
  ) => {
    return (
      <div
        data-disabled={disabled}
        className={cn(chipVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <div className="py-[8px]">
          {children}
          Hello, this is a chip
        </div>
        <button
          disabled={disabled}
          className="flex h-full flex-col justify-center items-center gap-[10px] p-[10px]"
          onClick={onClick}
        >
          <Plus className="stroke-current" />
        </button>
      </div>
    )
  }
)

export { Chip, ChipProps }

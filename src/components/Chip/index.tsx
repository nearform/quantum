import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Plus } from '@/assets'

const chipVariants = cva(
  [
    'inline-flex',
    'rounded-full',
    'gap-1',
    'shrink-0',
    'items-center',
    'justify-center',
    'px-[10px]',
    'py-[8px]',
    'border border-[2px]',
    'font-semibold'
  ],
  {
    variants: {
      variant: {
        default: ['bg-background', 'border-border-subtle', 'text-foreground'],
        warning: [],
        success: [],
        error: [],
        info: [],
        active: []
      },
      size: {
        default: ['h-[26px] text-xs'],
        lg: ['h-[33px]']
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
    VariantProps<typeof chipVariants> {}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        className={cn(chipVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        Hello, this is a chip
        <button
          className="flex p-[10px] flex-col justify-center items-center gap-[10px]"
          onClick={() => {
            console.log('hello')
          }}
        >
          <Plus className="stroke-current" />
        </button>
      </div>
    )
  }
)

export { Chip, ChipProps }

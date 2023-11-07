import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonGroupItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white ' +
          'hover:bg-button-primary-hover ' +
          'focus:bg-button-primary-focus ' +
          'disabled:bg-button-disabled disabled:text-foreground-subtle ',
        secondary:
          'bg-white text-grey-900 border-border ' +
          'hover:bg-button-disabled hover:border-border ' +
          'focus:bg-primary-50 focus:border-foreground-muted ' +
          'disabled:bg-button-disabled disabled:border-border-subtle disabled:text-foreground-subtle'
      },
      size: {
        md: 'py-2.5 px-3 text-sm',
        sm: 'px-2.5 py-2 text-sm'
      },
      orientation: {
        horizontal: 'border-r-[1px]',
        vertical: 'border-b-[1px]'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      orientation: 'horizontal'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonGroupItemVariants> {
  asChild?: boolean
}
const ButtonGroupItem = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonGroupItemVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
ButtonGroupItem.displayName = 'Button'

export { ButtonGroupItem }

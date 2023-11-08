import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
const buttonGroupVariants = cva(
  ['flex', '[&>*]:rounded-none', '[&>*]:border-0 divide-border-subtle'],
  {
    variants: {
      orientation: {
        horizontal: [
          'flex-row',
          'divide-x-[1px]',
          '[&>*:first-child]:border-0',
          '[&>*:first-child]:rounded-l-lg',
          '[&>*:last-child]:rounded-r-lg'
        ],
        vertical: [
          'flex-col',
          'divide-y-[1px]',
          '[&>*:first-child]:border-0',
          '[&>*:first-child]:rounded-t-lg',
          '[&>*:last-child]:rounded-b-lg'
        ]
      }
    },
    defaultVariants: {
      orientation: 'horizontal'
    }
  }
)
import { cn } from '@/lib/utils'

interface ButtonGroupProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof buttonGroupVariants> {
  variant?: 'primary' | 'secondary'
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, variant, ...props }, ref) => {
    return (
      <div
        className={cn(buttonGroupVariants({ orientation }), className)}
        {...props}
        ref={ref}
      ></div>
    )
  }
)
ButtonGroup.displayName = 'ButtonGroup'
export { ButtonGroup, type ButtonGroupProps }

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
const buttonGroupVariants = cva(
  [
    'flex',
    '[&>*]:rounded-none',
    '[&>*]:border-r-[1px]',
    '[&>*]:border-white',
    '[&>*:first-child]:rounded-s-lg',
    '[&>*:last-child]:rounded-e-lg'
  ],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col'
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
    VariantProps<typeof buttonGroupVariants> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, ...props }, ref) => {
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
export { ButtonGroup }

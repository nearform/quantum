import React from 'react'
import { cva } from 'class-variance-authority'
const buttonGroupVariants = cva([
  ['[&>*:first-child]:rounded-s-lg', '[&>*:last-child]:rounded-e-lg'],
  {
    variants: {
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
])
import { cn } from '@/lib/utils'

type ButtonGroupProps = React.ComponentPropsWithoutRef<'div'>

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(buttonGroupVariants(), className)}
        {...props}
        ref={ref}
      ></div>
    )
  }
)
ButtonGroup.displayName = 'ButtonGroup'
export { ButtonGroup }

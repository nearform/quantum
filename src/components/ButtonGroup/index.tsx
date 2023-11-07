import React from 'react'
import { cva } from 'class-variance-authority'
const buttonGroupVariants = cva([
  ['[&>*:first-child]:rounded-s-lg', '[&>*:last-child]:rounded-e-lg']
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

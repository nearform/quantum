import React from 'react'
import { cva } from 'class-variance-authority'
import { ButtonProps } from '../Button'
const buttonGroupVariants = cva([['first:rounded-s-lg last:rounded-e-lg']])
import { cn } from '@/lib/utils'

const ButtonGroup = React.forwardRef<ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(buttonGroupVariants, className)}
        {...props}
        {...ref}
      ></div>
    )
  }
)
ButtonGroup.displayName = 'ButtonGroup'
export { ButtonGroup }

import React from 'react'
import { cva } from 'class-variance-authority'

const buttonGroupVariants = cva([['first:rounded last:rounded']])
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const ButtonGroup2 = React.forwardRef<HTMLButtonElement>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonGroupVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ButtonGroup.displayName = 'Button'

const ButtonGroup = React.forwardRef<HTMLDivElement>(({ ...props }) => {})

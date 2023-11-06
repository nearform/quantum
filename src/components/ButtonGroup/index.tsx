import React from 'react'
import { cva } from 'class-variance-authority'
import { Button } from '@/components/Button'
const buttonGroupVariants = cva([['first:rounded last:rounded']])
import { cn } from '@/lib/utils'

const ButtonGroup = React.forwardRef<HTMLDivElement>(
  ({ children, className, ...props }) => {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }
)

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Step } from './Step'

const stepsVariant = cva(['flex', 'text-grey-300', 'space-x-1'])

interface StepsIndicatorProp {
  selectedIndex: number
  length: number
  className?: string
  childClassName?: string
  props?: any
}

const StepsIndicator = React.forwardRef<HTMLDivElement, StepsIndicatorProp>(
  ({ selectedIndex, length, className, childClassName, props }, ref) => {
    const Steps = Array(length).fill(
      <Step selected="false" className={childClassName} />
    )
    Steps[selectedIndex] = <Step selected="true" className={childClassName} />
    return (
      <div ref={ref} className={cn(stepsVariant(), className)} {...props}>
        {Steps}
      </div>
    )
  }
)
export { StepsIndicator }

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Step } from './Step'

const stepsVariant = cva([
  'flex',
  'text-accent-alt',
  'space-x-1 ',
  'content-center items-center'
])

interface StepsIndicatorProp {
  selectedIndex?: number
  length?: number
  className?: string
  childClassName?: string
  props?: any
  name?: string
}

const StepsIndicator = React.forwardRef<HTMLDivElement, StepsIndicatorProp>(
  (
    {
      className,
      childClassName,
      name = '',
      selectedIndex = 0,
      length = 1,
      props
    },
    ref
  ) => {
    const Steps = Array(length)
      .fill(null)
      .map((_, i) => {
        return i === selectedIndex ? (
          <Step
            key={`${i}-step-${name}`}
            selected="true"
            className={childClassName}
          />
        ) : (
          <Step selected="false" className={childClassName} />
        )
      })
    return (
      <div ref={ref} className={cn(stepsVariant(), className)} {...props}>
        {Steps}
      </div>
    )
  }
)
export { StepsIndicator, StepsIndicatorProp }

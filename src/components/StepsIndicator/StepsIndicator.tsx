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
  props?: any
  name?: string
  onClick?: (i: number) => void
}

const StepsIndicator = React.forwardRef<HTMLDivElement, StepsIndicatorProp>(
  ({ name = '', selectedIndex = 0, length = 1, onClick, props }, ref) => {
    const Steps = Array(length)
      .fill(null)
      .map((_, i) => {
        return (
          <button
            key={`${i}-step-${name}`}
            className="flex h-6 w-6 items-center justify-center m-0"
            onClick={() => onClick?.(i)}
          >
            <Step selected={i === selectedIndex ? 'true' : 'false'} />
          </button>
        )
      })
    return (
      <div ref={ref} className={cn(stepsVariant())} {...props}>
        {Steps}
      </div>
    )
  }
)
export { StepsIndicator, StepsIndicatorProp }

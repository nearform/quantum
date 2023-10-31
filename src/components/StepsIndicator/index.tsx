import * as React from 'react'
import ProgressCurrent from '@/assets/build/progresscurrent.icon'
import ProgressDefault from '@/assets/build/progressdefault.icon'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
const stepsVariant = cva(['flex'], {
  variants: {
    orientation: {
      vertical: ['flex-column space-y-1'],
      horizontal: ['flex-row space-x-1']
    }
  }
})

interface StepsIndicatorProp {
  index: number
  length: number
  orientation?: 'vertical' | 'horizontal'
  className?: string
  props?: any
}

const StepIndicator = React.forwardRef<HTMLDivElement, StepsIndicatorProp>(
  ({ index, length, className, orientation }, ref) => {
    const Steps = Array(length).fill(<ProgressDefault />)
    Steps[index] = <ProgressCurrent />
    return (
      <div ref={ref} className={cn(stepsVariant({ orientation }), className)}>
        {Steps}
      </div>
    )
  }
)
export { StepIndicator }

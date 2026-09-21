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

const stepButtonVariant = cva([
  'flex h-6 w-6 items-center justify-center m-0',
  'rounded-full',
  'outline-hidden',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-1',
  'focus-visible:outline-current'
])

interface StepsIndicatorProp {
  selectedIndex?: number
  length?: number
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  name?: string
  onClick?: (i: number) => void
  label?: string
  stepLabel?: (step: number, total: number) => string
}

const StepsIndicator = React.forwardRef<HTMLDivElement, StepsIndicatorProp>(
  (
    {
      name = '',
      selectedIndex = 0,
      length = 1,
      onClick,
      label = 'Progress',
      stepLabel = (step, total) => `Step ${step} of ${total}`,
      props
    },
    ref
  ) => {
    const Steps = Array(length)
      .fill(null)
      .map((_, i) => {
        const selected = i === selectedIndex
        return (
          <button
            key={`${i}-step-${name}`}
            type="button"
            aria-label={stepLabel(i + 1, length)}
            aria-current={selected ? 'step' : undefined}
            className={stepButtonVariant()}
            onClick={() => onClick?.(i)}
          >
            <Step selected={selected ? 'true' : 'false'} />
          </button>
        )
      })
    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className={cn(stepsVariant())}
        {...props}
      >
        {Steps}
      </div>
    )
  }
)

StepsIndicator.displayName = 'StepsIndicator'

export { StepsIndicator, StepsIndicatorProp }

import * as React from 'react'
import { cva } from 'class-variance-authority'

import { BsChevronLeft, BsChevronRight } from '@/assets'
import { StepsIndicator } from '@/components/StepsIndicator'
import { cn } from '@/lib/utils'

type StepStatus = 'complete' | 'current' | 'upcoming'

interface StepperItemContextValue {
  step: number
  status: StepStatus
  last: boolean
}

const StepperItemContext = React.createContext<StepperItemContextValue | null>(
  null
)

interface StepperProps extends React.OlHTMLAttributes<HTMLOListElement> {
  currentStep?: number
}

const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ className, currentStep = 0, children, ...props }, ref) => {
    const items = React.Children.toArray(children).filter(React.isValidElement)

    return (
      <ol
        ref={ref}
        role="list"
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        {items.map((child, index) => (
          <StepperItemContext.Provider
            key={child.key ?? index}
            value={{
              step: index + 1,
              status:
                index < currentStep
                  ? 'complete'
                  : index === currentStep
                    ? 'current'
                    : 'upcoming',
              last: index === items.length - 1
            }}
          >
            {child}
          </StepperItemContext.Provider>
        ))}
      </ol>
    )
  }
)
Stepper.displayName = 'Stepper'

const stepperNumberVariants = cva(
  [
    'flex h-6 w-6 shrink-0 items-center justify-center rounded-sm',
    'text-[10px] font-semibold leading-none'
  ],
  {
    variants: {
      status: {
        complete: [
          'bg-background-subtle text-foreground',
          'dark:bg-background-subtle-dark dark:text-foreground-dark'
        ],
        current: [
          'bg-background-inverse text-foreground-inverse',
          'dark:bg-background-dark dark:text-foreground-dark'
        ],
        upcoming: [
          'bg-background-subtle text-foreground-subtle',
          'dark:bg-background-subtle-dark dark:text-foreground-subtle-dark'
        ]
      }
    }
  }
)

const stepperTitleVariants = cva('text-xs leading-normal', {
  variants: {
    status: {
      complete: 'text-foreground dark:text-foreground-dark',
      current: 'font-semibold text-foreground dark:text-foreground-dark',
      upcoming: 'text-foreground-muted dark:text-foreground-muted-dark'
    }
  }
})

interface StepperItemProps extends Omit<
  React.LiHTMLAttributes<HTMLLIElement>,
  'title'
> {
  title: React.ReactNode
  description?: React.ReactNode
}

const StepperItem = React.forwardRef<HTMLLIElement, StepperItemProps>(
  ({ className, title, description, ...props }, ref) => {
    const context = React.useContext(StepperItemContext)
    if (!context) {
      throw new Error('StepperItem must be rendered inside a Stepper')
    }
    const { step, status, last } = context

    return (
      <li
        ref={ref}
        aria-current={status === 'current' ? 'step' : undefined}
        data-status={status}
        className={cn(
          'flex min-w-0 items-center gap-2',
          last ? 'flex-none' : 'flex-1',
          className
        )}
        {...props}
      >
        <span aria-hidden="true" className={stepperNumberVariants({ status })}>
          {step}
        </span>
        <span className="flex shrink-0 flex-col whitespace-nowrap">
          <span className={stepperTitleVariants({ status })}>{title}</span>
          {description ? (
            <span className="text-[10px] leading-normal text-foreground-subtle dark:text-foreground-subtle-dark">
              {description}
            </span>
          ) : null}
        </span>
        {last ? null : (
          <span
            aria-hidden="true"
            className="h-px min-w-4 flex-1 bg-border dark:bg-border-dark"
          />
        )}
      </li>
    )
  }
)
StepperItem.displayName = 'StepperItem'

const stepperNavButtonVariants = cva([
  'inline-flex min-h-6 items-center gap-1.5 rounded-sm px-2 py-1',
  'text-xs leading-normal',
  'text-foreground dark:text-foreground-dark',
  'cursor-pointer',
  'hover:underline',
  'focus-visible:outline-hidden focus-visible:underline',
  'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10',
  'disabled:cursor-not-allowed disabled:no-underline',
  'disabled:text-foreground-subtle dark:disabled:text-foreground-subtle-dark'
])

interface StepperNavProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  currentStep: number
  totalSteps: number
  onStepChange?: (step: number) => void
  indicator?: 'dots' | 'counter'
  label?: string
  backLabel?: React.ReactNode
  nextLabel?: React.ReactNode
  stepLabel?: (step: number, total: number) => string
}

const StepperNav = React.forwardRef<HTMLDivElement, StepperNavProps>(
  (
    {
      className,
      currentStep,
      totalSteps,
      onStepChange,
      indicator = 'dots',
      label = 'Steps',
      backLabel = 'Back',
      nextLabel = 'Next',
      stepLabel = (step, total) => `Step ${step} of ${total}`,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={cn('flex items-center gap-6', className)}
      {...props}
    >
      <button
        type="button"
        className={stepperNavButtonVariants()}
        disabled={currentStep <= 0}
        onClick={() => onStepChange?.(currentStep - 1)}
      >
        <BsChevronLeft className="h-3 w-3 shrink-0" aria-hidden="true" />
        {backLabel}
      </button>
      {indicator === 'dots' ? (
        <StepsIndicator
          length={totalSteps}
          selectedIndex={currentStep}
          onClick={onStepChange}
          stepLabel={stepLabel}
        />
      ) : (
        <span
          aria-live="polite"
          className="text-xs leading-normal text-foreground dark:text-foreground-dark"
        >
          <span aria-hidden="true">
            {currentStep + 1}/{totalSteps}
          </span>
          <span className="sr-only">
            {stepLabel(currentStep + 1, totalSteps)}
          </span>
        </span>
      )}
      <button
        type="button"
        className={stepperNavButtonVariants()}
        disabled={currentStep >= totalSteps - 1}
        onClick={() => onStepChange?.(currentStep + 1)}
      >
        {nextLabel}
        <BsChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
      </button>
    </div>
  )
)
StepperNav.displayName = 'StepperNav'

export {
  Stepper,
  StepperItem,
  StepperNav,
  type StepperProps,
  type StepperItemProps,
  type StepperNavProps,
  type StepStatus
}

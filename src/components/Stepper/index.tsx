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

const flattenSteps = (
  children: React.ReactNode,
  keyPrefix = ''
): Array<{ key: string; element: React.ReactElement }> =>
  React.Children.toArray(children).flatMap(child => {
    if (!React.isValidElement(child)) return []
    const key = `${keyPrefix}${child.key}`
    if (child.type === React.Fragment) {
      return flattenSteps(
        (child.props as { children?: React.ReactNode }).children,
        key
      )
    }
    return [{ key, element: child }]
  })

interface StepperProps extends React.OlHTMLAttributes<HTMLOListElement> {
  currentStep?: number
}

const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ className, currentStep = 0, children, ...props }, ref) => {
    const items = flattenSteps(children)
    const current = Math.min(
      Number.isFinite(currentStep) ? Math.max(0, Math.floor(currentStep)) : 0,
      Math.max(0, items.length - 1)
    )

    return (
      <ol
        ref={ref}
        role="list"
        className={cn('flex min-w-0 items-center gap-2', className)}
        {...props}
      >
        {items.map(({ key, element }, index) => (
          <StepperItemContext.Provider
            key={key}
            value={{
              step: index + 1,
              status:
                index < current
                  ? 'complete'
                  : index === current
                    ? 'current'
                    : 'upcoming',
              last: index === items.length - 1
            }}
          >
            {element}
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
          'bg-background-subtle text-foreground-muted',
          'dark:bg-background-subtle-dark dark:text-foreground-muted-dark'
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
          last ? 'flex-initial' : 'flex-auto',
          className
        )}
        {...props}
      >
        <span aria-hidden="true" className={stepperNumberVariants({ status })}>
          {step}
        </span>
        <span className="flex min-w-0 flex-col break-words">
          <span className={stepperTitleVariants({ status })}>{title}</span>
          {description != null && description !== false ? (
            <span className="text-[10px] leading-normal text-foreground-muted dark:text-foreground-muted-dark">
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
  ) => {
    const total = Number.isFinite(totalSteps)
      ? Math.max(0, Math.floor(totalSteps))
      : 0
    const step = Math.min(Math.max(0, currentStep), Math.max(0, total - 1))

    return (
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
          disabled={total === 0 || step <= 0}
          onClick={() => onStepChange?.(step - 1)}
        >
          <BsChevronLeft className="h-3 w-3 shrink-0" aria-hidden="true" />
          {backLabel}
        </button>
        {total === 0 ? null : indicator === 'dots' ? (
          <StepsIndicator
            length={total}
            selectedIndex={step}
            onClick={onStepChange}
            stepLabel={stepLabel}
          />
        ) : (
          <span
            aria-live="polite"
            className="text-xs leading-normal text-foreground dark:text-foreground-dark"
          >
            <span aria-hidden="true">
              {step + 1}/{total}
            </span>
            <span className="sr-only">{stepLabel(step + 1, total)}</span>
          </span>
        )}
        <button
          type="button"
          className={stepperNavButtonVariants()}
          disabled={total === 0 || step >= total - 1}
          onClick={() => onStepChange?.(step + 1)}
        >
          {nextLabel}
          <BsChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
        </button>
      </div>
    )
  }
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

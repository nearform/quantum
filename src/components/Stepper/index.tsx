import * as React from 'react'
import { cva } from 'class-variance-authority'

import { BsCheck, BsChevronLeft, BsChevronRight } from '../../assets/index.ts'
import { StepsIndicator } from '../StepsIndicator/index.tsx'
import { cn } from '../../lib/utils.ts'

type StepStatus = 'complete' | 'current' | 'upcoming'

type StepperOrientation = 'horizontal' | 'vertical'

interface StepperItemContextValue {
  step: number
  status: StepStatus
  last: boolean
  orientation: StepperOrientation
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
  currentStep?: number | null
  orientation?: StepperOrientation
}

const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  (
    {
      className,
      currentStep = 0,
      orientation = 'horizontal',
      children,
      ...props
    },
    ref
  ) => {
    const items = flattenSteps(children)
    const current =
      currentStep === null
        ? -1
        : Math.min(
            Number.isFinite(currentStep)
              ? Math.max(0, Math.floor(currentStep))
              : 0,
            Math.max(0, items.length - 1)
          )

    return (
      <ol
        ref={ref}
        role="list"
        data-orientation={orientation}
        className={cn(
          'flex min-w-0',
          orientation === 'vertical' ? 'flex-col' : 'items-center gap-2',
          className
        )}
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
              last: index === items.length - 1,
              orientation
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

const stepperTitleVariants = cva('', {
  variants: {
    orientation: {
      horizontal: 'text-xs leading-normal',
      vertical: 'text-sm leading-6'
    },
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
  status?: StepStatus
  statusLabel?: React.ReactNode
}

const defaultStatusLabels: Record<StepStatus, React.ReactNode> = {
  complete: 'Completed',
  current: null,
  upcoming: 'To do'
}

const StepperItem = React.forwardRef<HTMLLIElement, StepperItemProps>(
  (
    {
      className,
      title,
      description,
      status: statusProp,
      statusLabel,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(StepperItemContext)
    if (!context) {
      throw new Error('StepperItem must be rendered inside a Stepper')
    }
    const { step, last, orientation } = context
    const status = statusProp ?? context.status
    const hasDescription = description != null && description !== false

    if (orientation === 'vertical') {
      const label = statusLabel ?? defaultStatusLabels[status]

      return (
        <li
          ref={ref}
          aria-current={status === 'current' ? 'step' : undefined}
          data-status={status}
          className={cn('flex min-w-0 gap-3', className)}
          {...props}
        >
          <span className="flex flex-col items-center">
            <span
              aria-hidden="true"
              className={stepperNumberVariants({ status })}
            >
              {status === 'complete' ? (
                <BsCheck className="h-4 w-4 fill-current" />
              ) : (
                step
              )}
            </span>
            {last ? null : (
              <span
                aria-hidden="true"
                className="my-1 min-h-4 w-px flex-1 bg-border dark:bg-border-dark"
              />
            )}
          </span>
          <span
            className={cn(
              'flex min-w-0 flex-col break-words',
              last ? null : 'pb-4'
            )}
          >
            <span className={stepperTitleVariants({ orientation, status })}>
              {title}
              {label != null && label !== false ? (
                <span className="sr-only"> {label}</span>
              ) : null}
            </span>
            {hasDescription ? (
              <span className="text-xs leading-normal text-foreground-muted dark:text-foreground-muted-dark">
                {description}
              </span>
            ) : null}
          </span>
        </li>
      )
    }

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
          <span className={stepperTitleVariants({ orientation, status })}>
            {title}
            {statusLabel != null && statusLabel !== false ? (
              <span className="sr-only"> {statusLabel}</span>
            ) : null}
          </span>
          {hasDescription ? (
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
  type StepperOrientation,
  type StepStatus
}

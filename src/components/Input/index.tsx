import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { BsX, BsSearch } from '@/assets'

const leftSideVariants = cva(['flex', 'items-center', 'text-inherit'])

const rightSideVariants = cva([
  'flex',
  'self-center text-inherit',
  'rounded-xs',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-current'
])

const formVariants = cva(
  [
    'flex',
    'border',
    'border-2',
    'rounded-lg',
    'overflow-hidden',
    'p-3',
    'items-center',
    'gap-1.5',
    '[&:has(:disabled)]:border-none'
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-border-subtle',
          'dark:border-border-subtle-dark',
          'bg-background-alt',
          'dark:bg-background-alt-dark',
          'hover:border-border-hover',
          'hover:focus-within:border-border-focus',
          'dark:hover:focus-within:border-border-focus-dark',
          'focus-within:shadow-brandGreen',
          'text-foreground-muted',
          'dark:text-foreground-muted-dark',
          'dark:focus-within:shadow-brandGreen-10'
        ],
        error: [
          'border-feedback-red',
          'text-feedback-red',
          'bg-red-50',
          'hover:border-red-700',
          'focus-within:shadow-red'
        ],
        success: [
          'border-feedback-green',
          'text-feedback-green',
          'bg-green-50',
          'hover:border-green-700',
          'focus-within:shadow-green'
        ]
      }
    }
  }
)

const inputVariants = cva(
  ['flex', 'flex-grow', 'items-center', 'outline-hidden', 'bg-transparent'],
  {
    variants: {
      variant: {
        primary: ['text-foreground', 'dark:text-foreground-dark'],
        error: ['text-feedback-red'],
        success: ['text-green-700']
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

type InputType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {})

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  variant: 'primary' | 'error' | 'success'
  type: InputType
  formClassName?: string
  leftSideClassName?: string
  leftSideChild?: React.ReactNode
  rightSideChild?: React.ReactNode
  labelText?: string
  helpText?: string
  clearLabel?: string
  onClear: () => void
}

const convertTypeToLeftComponent = (type: InputType) => {
  const mapping: Partial<Record<InputType, React.ReactNode>> = {
    search: <BsSearch aria-hidden="true" />
  }
  return mapping[type] ?? null
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      id,
      className,
      formClassName,
      leftSideClassName,
      variant,
      leftSideChild,
      rightSideChild,
      labelText,
      helpText,
      clearLabel = 'Clear input',
      onClear,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const helpTextId = `${inputId}-helptext`
    const describedBy =
      [ariaDescribedby, helpText ? helpTextId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    const leftSideComponent = leftSideChild ?? convertTypeToLeftComponent(type)
    const rightSideComponent = rightSideChild ?? (
      <BsX strokeWidth={0.6} aria-hidden="true" />
    )

    const field = (
      <div className={cn(formVariants({ variant }), formClassName)}>
        {leftSideComponent && (
          <div className={cn(leftSideVariants(), leftSideClassName)}>
            {leftSideComponent}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(inputVariants({ variant }), className)}
          ref={ref}
          aria-describedby={describedBy}
          {...props}
        />
        <div className="input-right-side"></div>
        <button
          type="button"
          onClick={onClear}
          aria-label={clearLabel}
          className={rightSideVariants()}
        >
          {rightSideComponent}
        </button>
      </div>
    )

    if (!labelText && !helpText) {
      return field
    }

    return (
      <div className="flex flex-col gap-3">
        {labelText && (
          <label
            htmlFor={inputId}
            className="text-m text-foreground dark:text-foreground-dark"
          >
            {labelText}
          </label>
        )}
        {field}
        {helpText && (
          <span
            id={helpTextId}
            className="text-sm text-foreground-muted dark:text-foreground-muted-dark"
          >
            {helpText}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, InputProps, formVariants }

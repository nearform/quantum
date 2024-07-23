import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { BsX, BsSearch } from '@/assets'

const leftSideVariants = cva(['flex', 'items-center', 'text-inherit'])

const rightSideVariants = cva(['flex', 'self-center text-inherit'])

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
  ['flex', 'flex-grow', 'items-center', 'outline-none', 'bg-transparent'],
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
  onClear: () => void
}

const convertTypeToLeftComponent = (type: InputType) => {
  const mapping: Partial<Record<InputType, React.ReactNode>> = {
    search: <BsSearch />
  }
  return mapping[type] ?? null
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      className,
      formClassName,
      leftSideClassName,
      variant,
      leftSideChild,
      rightSideChild,
      onClear,
      ...props
    },
    ref
  ) => {
    const leftSideComponent = leftSideChild ?? convertTypeToLeftComponent(type)
    const rightSideComponent = rightSideChild ?? <BsX strokeWidth={0.6} />

    return (
      <label className={cn(formVariants({ variant }), formClassName)}>
        {leftSideComponent && (
          <div className={cn(leftSideVariants(), leftSideClassName)}>
            {leftSideComponent}
          </div>
        )}
        <input
          type={type}
          className={cn(inputVariants({ variant }), className)}
          ref={ref}
          {...props}
        />
        <div className="input-right-side"></div>
        <button type="button" onClick={onClear} className={rightSideVariants()}>
          {rightSideComponent}
        </button>
      </label>
    )
  }
)

export { Input, InputProps, formVariants }

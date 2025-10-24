import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

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

const textareaVariants = cva(
  [
    'flex',
    'flex-grow',
    'items-center',
    'outline-none',
    'bg-transparent',
    'resize-none'
  ],
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

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant: 'primary' | 'error' | 'success'
  formClassName?: string
  leftSideClassName?: string
  leftSideChild?: React.ReactNode
  rightSideChild?: React.ReactNode
  onClear?: () => void
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
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
    const leftSideComponent = leftSideChild ?? null
    const rightSideComponent = rightSideChild ?? null

    return (
      <label className={cn(formVariants({ variant }), formClassName)}>
        {leftSideComponent && (
          <div className={cn(leftSideVariants(), leftSideClassName)}>
            {leftSideComponent}
          </div>
        )}
        <textarea
          className={cn(textareaVariants({ variant }), className)}
          ref={ref}
          {...props}
        />
        <div className="textarea-right-side"></div>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className={rightSideVariants()}
          >
            {rightSideComponent}
          </button>
        )}
      </label>
    )
  }
)

export { Textarea, TextareaProps, formVariants }

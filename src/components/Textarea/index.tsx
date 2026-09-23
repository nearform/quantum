import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const textareaVariants = cva(
  [
    'flex',
    'flex-grow',
    'outline-hidden',
    'resize-none',
    'border',
    'border-2',
    'rounded-lg',
    'field-sizing-content',
    'p-3',
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
          'hover:focus-within:border-brandBlue-100',
          'dark:hover:focus-within:border-brandBlue-80',
          'focus-within:border-brandBlue-100',
          'focus-within:ring-[3px]',
          'focus-within:ring-brandBlue-10',
          'text-foreground',
          'dark:text-foreground-dark',
          'dark:focus-within:border-brandBlue-80',
          'dark:focus-within:ring-0',
          'dark:focus-within:outline-solid',
          'dark:focus-within:outline-2',
          'dark:focus-within:outline-offset-2',
          'dark:focus-within:outline-brandGreen-100'
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
          'text-green-700',
          'bg-green-50',
          'hover:border-green-700',
          'focus-within:shadow-green'
        ],
        disabled: [
          'bg-background-subtle',
          'dark:bg-background-subtle-dark',
          'cursor-not-allowed',
          'text-foreground-muted',
          'dark:text-foreground-muted-dark'
        ]
      },
      defaultVariants: {
        variant: 'primary'
      }
    }
  }
)

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant: 'primary' | 'error' | 'success' | 'disabled'
  labelText?: string
  helpText?: string
  id?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      labelText,
      helpText,
      id,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const textareaId = id ?? generatedId
    const helpTextId = `${textareaId}-helptext`
    const describedBy =
      [ariaDescribedby, helpText ? helpTextId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    return (
      <div className="flex flex-col gap-3">
        {labelText && (
          <label
            id={`${textareaId}-label`}
            htmlFor={textareaId}
            className="text-m text-foreground dark:text-foreground-dark"
          >
            {labelText}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(textareaVariants({ variant }), className)}
          ref={ref}
          aria-describedby={describedBy}
          {...props}
        />
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

Textarea.displayName = 'Textarea'

export { Textarea, TextareaProps, textareaVariants }

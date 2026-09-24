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
    'rounded-brandControl',
    'field-sizing-content',
    'p-3',
    'gap-1.5',
    'disabled:border-brandGrey-30',
    'disabled:hover:border-brandGrey-30',
    'disabled:bg-brandMidnight-10',
    'disabled:text-brandMidnight-30',
    'disabled:placeholder:text-brandMidnight-30',
    'disabled:cursor-not-allowed',
    'dark:disabled:border-brandDark-border',
    'dark:disabled:hover:border-brandDark-border',
    'dark:disabled:bg-brandDark-raised',
    'dark:disabled:text-brandMidnight-50',
    'dark:disabled:placeholder:text-brandMidnight-50'
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-brandGrey-30',
          'bg-white',
          'text-brandMidnight-100',
          'placeholder:text-brandMidnight-30',
          'dark:border-brandDark-border',
          'dark:bg-brandDark-surface',
          'dark:text-white',
          'hover:border-brandGrey-80',
          'hover:focus-within:border-brandBlue-100',
          'dark:hover:focus-within:border-brandBlue-80',
          'focus-within:border-brandBlue-100',
          'focus-within:ring-[3px]',
          'focus-within:ring-brandBlue-10',
          'dark:focus-within:border-brandBlue-80',
          'dark:focus-within:ring-0',
          'dark:focus-within:outline-solid',
          'dark:focus-within:outline-2',
          'dark:focus-within:outline-offset-2',
          'dark:focus-within:outline-brandGreen-100'
        ],
        error: [
          'border-feedback-danger',
          'text-feedback-danger',
          'bg-feedback-danger10',
          'hover:border-feedback-danger',
          'focus-within:shadow-red'
        ],
        success: [
          'border-feedback-success',
          'text-feedback-success',
          'bg-feedback-success10',
          'hover:border-feedback-success',
          'focus-within:shadow-green'
        ],
        disabled: [
          'border-brandGrey-30',
          'bg-brandMidnight-10',
          'text-brandMidnight-30',
          'placeholder:text-brandMidnight-30',
          'cursor-not-allowed',
          'dark:border-brandDark-border',
          'dark:bg-brandDark-raised',
          'dark:text-brandMidnight-50',
          'dark:placeholder:text-brandMidnight-50'
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
            className={cn(
              'text-label font-medium text-brandMidnight-100 dark:text-white',
              (variant === 'disabled' || props.disabled) &&
                'text-brandMidnight-30 dark:text-brandMidnight-50'
            )}
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

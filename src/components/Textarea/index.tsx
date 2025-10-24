import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const textareaVariants = cva(
  [
    'flex',
    'flex-grow',
    'outline-none',
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
          'hover:focus-within:shadow-brandGreen',
          'dark:hover:focus-within:border-border-focus-dark',
          'focus-within:shadow-brandGreen',
          'text-foreground',
          'dark:text-foreground-dark',
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
  ({ className, variant, labelText, helpText, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-3">
        {labelText && (
          <label
            id={`${id}-label`}
            htmlFor={id}
            className="text-m text-foreground dark:text-foreground-dark"
          >
            {labelText}
          </label>
        )}
        <textarea
          id={id}
          className={cn(textareaVariants({ variant }), className)}
          ref={ref}
          {...props}
          aria-labelledby={`${labelText ? `${id}-label` : ''} ${helpText ? `${id}-helptext` : ''}`.trim()}
        />
        {helpText && (
          <span
            id={`${id}-helptext`}
            className="text-sm text-foreground-muted dark:text-foreground-muted-dark"
          >
            {helpText}
          </span>
        )}
      </div>
    )
  }
)

export { Textarea, TextareaProps, textareaVariants }

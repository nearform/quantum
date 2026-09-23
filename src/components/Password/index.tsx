import React, { useState } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { BsEye, BsEyeSlash } from '@/assets'

import { formVariants } from '../Input'

/**
 * A 24x24 target around the 16x16 eye, for the same reason `Input`'s clear
 * control has one: 24 is the smallest target WCAG 2.5.8 accepts. The negative
 * margin is half the difference between the two, so the target grows around
 * the eye rather than pushing it in from the edge of the field.
 */
const toggleMaskVariants = cva([
  'flex',
  'h-6',
  'w-6',
  'shrink-0',
  '-mr-1',
  'items-center',
  'justify-center',
  'self-center text-inherit',
  'rounded-xs',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-current',
  '[&>svg]:h-4',
  '[&>svg]:w-4'
])

const passwordVariants = cva(
  ['flex', 'flex-grow', 'items-center', 'outline-hidden', 'bg-transparent'],
  {
    variants: {
      variant: {
        primary: ['text-foreground', 'dark:text-foreground-dark'],
        error: ['text-feedback-error', 'dark:text-feedback-error-dark'],
        success: ['text-green-700', 'dark:text-feedback-success-dark']
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

/**
 * `size` is the field's height, and is passed through to the same variants
 * `Input` uses so the two line up in a form. As there, it displaces the HTML
 * attribute of that name, which the `flex-grow` input was overruling anyway.
 */
interface PasswordProps extends Omit<
  React.HTMLProps<HTMLInputElement>,
  'size'
> {
  formClassName?: string
  variant?: 'primary' | 'error' | 'success'
  size?: 'sm' | 'default' | 'lg'
  toggleMask?: boolean
  labelText?: string
  helpText?: string
  showLabel?: string
  hideLabel?: string
}

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  (
    {
      id,
      className,
      formClassName,
      variant = 'primary',
      size,
      toggleMask = true,
      labelText,
      helpText,
      showLabel = 'Show password',
      hideLabel = 'Hide password',
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref
  ) => {
    const [isMaskOn, setIsMaskOn] = useState(true)

    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const helpTextId = `${inputId}-helptext`
    const describedBy =
      [ariaDescribedby, helpText ? helpTextId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    const onToggleMask = () => setIsMaskOn(isMaskOn => !isMaskOn)

    const field = (
      <div className={cn(formVariants({ variant, size }), formClassName)}>
        <input
          id={inputId}
          type={isMaskOn ? 'password' : 'text'}
          className={cn(passwordVariants({ variant }), className)}
          ref={ref}
          aria-describedby={describedBy}
          {...props}
        />
        {toggleMask && (
          <button
            type="button"
            onClick={onToggleMask}
            aria-label={isMaskOn ? showLabel : hideLabel}
            aria-pressed={!isMaskOn}
            aria-controls={inputId}
            className={toggleMaskVariants()}
          >
            {isMaskOn ? (
              <BsEye aria-hidden="true" />
            ) : (
              <BsEyeSlash aria-hidden="true" />
            )}
          </button>
        )}
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

Password.displayName = 'Password'

export { Password, PasswordProps }

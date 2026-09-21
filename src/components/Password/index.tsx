import React, { useState } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { BsEye, BsEyeSlash } from '@/assets'

import { formVariants } from '../Input'

const toggleMaskVariants = cva([
  'flex',
  'self-center text-inherit',
  'rounded-xs',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-current'
])

const passwordVariants = cva(
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

interface PasswordProps extends React.HTMLProps<HTMLInputElement> {
  formClassName?: string
  variant?: 'primary' | 'error' | 'success'
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
      <div className={cn(formVariants({ variant }), formClassName)}>
        <input
          id={inputId}
          type={isMaskOn ? 'password' : 'text'}
          className={cn(passwordVariants({ variant }), className)}
          ref={ref}
          aria-describedby={describedBy}
          {...props}
        />
        <div className="input-right-side"></div>
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

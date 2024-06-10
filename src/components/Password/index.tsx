import React, { useState } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { BsEye, BsEyeSlash } from '@/assets'

import { formVariants } from '../Input'

const toggleMaskVariants = cva(['flex', 'self-center text-inherit'])

const passwordVariants = cva(
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

interface PasswordProps extends React.HTMLProps<HTMLInputElement> {
  formClassName?: string
  variant?: 'primary' | 'error' | 'success'
  toggleMask?: boolean
}

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  (
    {
      className,
      formClassName,
      variant = 'primary',
      toggleMask = true,
      ...props
    },
    ref
  ) => {
    const [isMaskOn, setIsMaskOn] = useState(true)

    const onToggleMask = () => {
      setIsMaskOn(isMaskOn => !isMaskOn)
    }

    return (
      <div className={cn(formVariants({ variant }), formClassName)}>
        <input
          type={isMaskOn ? 'password' : 'text'}
          className={cn(passwordVariants({ variant }), className)}
          ref={ref}
          {...props}
        />
        <div className="input-right-side"></div>
        {toggleMask && (
          <button
            type="button"
            onClick={onToggleMask}
            className={toggleMaskVariants()}
          >
            {isMaskOn ? <BsEye /> : <BsEyeSlash />}
          </button>
        )}
      </div>
    )
  }
)

export { Password, PasswordProps }

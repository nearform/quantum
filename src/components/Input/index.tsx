import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { ClearButton, User, SearchOutline } from '@/assets'

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
          'focus-within:shadow-blue',
          'text-foreground-muted',
          'dark:text-foreground-muted-dark'
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

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  variant: 'primary' | 'error' | 'success'
  type: 'text' | 'search'
  formClassName?: string
  leftSideClassName?: string
  leftSideChild?: React.ReactNode
  rightSideChild?: React.ReactNode
}

const convertTypeToComponent = {
  left: {
    text: <User />,
    search: <SearchOutline />
  }
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
      ...props
    },
    ref
  ) => {
    const leftSideComponent =
      leftSideChild ?? convertTypeToComponent.left[`${type}`]
    const rightSideComponent = rightSideChild ?? <ClearButton />

    return (
      <form className={cn(formVariants({ variant }), formClassName)}>
        <div className={cn(leftSideVariants(), leftSideClassName)}>
          {leftSideComponent}
        </div>
        <input
          type="text" //for now only accept text
          className={cn(inputVariants({ variant }), className)}
          ref={ref}
          {...props}
        />
        <div className="input-right-side"></div>
        <button className={rightSideVariants()} type="reset">
          {rightSideComponent}
        </button>
      </form>
    )
  }
)

export { Input, InputProps }

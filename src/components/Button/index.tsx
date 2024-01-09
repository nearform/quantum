import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const leftSideVariants = cva([
  'inline-flex',
  'items-center',
  'justify-center',
  'text-inherit',
  'text-justify',
  'mr-3',
  'pt-2.5',
  'h-1.5',
  'w-1.5'
])

const rightSideVariants = cva([
  'inline-flex',
  'items-center',
  'justify-center',
  'text-inherit',
  'text-justify',
  'ml-3',
  'pt-2.5',
  'h-1.5',
  'w-1.5'
])

const buttonVariants = cva(
  [
    'inline-flex',
    'rounded-lg',
    'border-4',
    'p-2',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-1',
    'focus-visible:ring-ring',
    'disabled:pointer-events-none',
    'cursor-pointer',
    'disabled:cursor-default'
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-button-primary',
          'text-white',
          'border-button-primary',
          'hover:bg-button-primary-hover',
          'hover:border-button-primary-hover',
          'focus:bg-button-primary-focus',
          'focus:border-blue-200',
          'focus-visible:shadow-blue',
          'disabled:bg-button-primary-disabled',
          'disabled:text-foreground-subtle',
          'disabled:border-button-primary-disabled',
          'selected:text-foreground-selected'
        ],
        secondary: [
          'bg-white',
          'text-grey-900',
          'border-border',
          'hover:bg-button-secondary-hover',
          'hover:border-button-secondary-border-hover',
          'focus:border-blue-200',
          'focus-visible:shadow-blue',
          'disabled:bg-button-secondary-disabled',
          'disabled:border-button-secondary-border-disabled',
          'disabled:text-foreground-subtle'
        ],
        tertiary: [
          'bg-transparent border-transparent',
          'text-foreground',
          'dark:text-white',
          'hover:bg-button-tertiary-hover',
          'hover:border-button-tertiary-hover',
          'hover:dark:text-button-tertiary-hover-dark',
          'focus:bg-button-tertiary-focus',
          'focus:border-blue-200',
          'focus-visible:shadow-blue',
          'disabled:text-foreground-subtle'
        ],
        success: [
          'bg-button-success',
          'text-white',
          'border-button-success',
          'hover:bg-button-success-hover',
          'hover:border-button-success-hover',
          'focus:bg-button-success-focus',
          'focus:border-green-200',
          'focus-visible:shadow-green',
          'disabled:bg-button-success-disabled',
          'disabled:border-button-success-disabled',
          'disabled:text-foreground-subtle'
        ],
        danger: [
          'bg-button-danger',
          'text-white',
          'border-button-danger',
          'hover:bg-button-danger-hover',
          'hover:border-button-danger-hover',
          'focus:bg-button-danger-focus',
          'focus:border-red-200',
          'focus-visible::shadow-red',
          'disabled:bg-button-danger-disabled',
          'disabled:border-button-danger-disabled',
          'disabled:text-foreground-subtle'
        ]
      },
      size: {
        lg: ['px-4', 'py-3', 'text-base'],
        md: ['p-2.5', 'text-sm'],
        sm: ['px-2.5', 'py-2', 'text-sm'],
        xs: ['px-2', 'py-2.5', 'text-xs']
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftSideChild?: React.ReactNode
  rightSideChild?: React.ReactNode
  leftSideClassName?: string
  rightSideClassName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  asChild?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      children,
      size,
      leftSideChild,
      rightSideChild,
      leftSideClassName,
      rightSideClassName,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled}
        onClick={e => {
          if (onClick) onClick(e)
        }}
        {...props}
      >
        {leftSideChild ? (
          <div className={cn(leftSideVariants(), leftSideClassName)}>
            {leftSideChild}
          </div>
        ) : (
          <></>
        )}
        {children}
        {rightSideChild ? (
          <div className={cn(rightSideVariants(), rightSideClassName)}>
            {rightSideChild}
          </div>
        ) : (
          <></>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }

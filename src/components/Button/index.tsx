import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'rounded-lg',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-1',
    'focus-visible:ring-ring',
    'disabled:pointer-events-none',
    'border-2 '
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-button-primary',
          'border-button-primary',
          'text-white',
          'hover:bg-button-primary-hover',
          'hover:border-button-primary-hover',
          'focus:bg-button-primary-focus',
          'focus:border-button-primary-focus',
          'focus-visible:shadow-blue',
          'disabled:bg-button-primary-disabled',
          'disabled:text-foreground-subtle',
          'disabled:border-button-primary-disabled'
        ],
        secondary: [
          'bg-white',
          'text-grey-900',
          'border-border',
          'hover:bg-button-secondary-hover',
          'hover:border-button-secondary-border-hover',
          'focus:border-button-secondary-border-focus',
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
          'focus:border-button-tertiary-focus',
          'focus-visible:shadow-blue',
          'disabled:text-foreground-subtle'
        ],
        success: [
          'bg-button-success',
          'border-button-success',
          'text-white',
          'hover:bg-button-success-hover',
          'hover:border-button-success-hover',
          'focus:bg-button-success-focus',
          'focus:border-button-success-focus',
          'focus-visible:shadow-green',
          'disabled:bg-button-success-disabled',
          'disabled:border-button-success-disabled',
          'disabled:text-foreground-subtle'
        ],
        danger: [
          'bg-button-danger',
          'border-button-danger',
          'text-white',
          'hover:bg-button-danger-hover',
          'hover:border-button-danger-hover',
          'focus:bg-button-danger-focus',
          'focus:border-button-danger-focus',
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
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

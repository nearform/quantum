import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const heroButtonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-full',
    'transition-colors',
    'focus-visible:outline-hidden',
    'disabled:pointer-events-none',
    'cursor-pointer',
    'disabled:cursor-default',
    'font-bold'
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-0',
          'bg-button-primary',
          'text-white',
          'hover:bg-button-primary-hover',
          'focus:bg-button-primary-focus',
          'focus:shadow-brandGreen',
          'active:shadow-none',
          'disabled:bg-button-primary-disabled',
          'disabled:text-foreground-subtle',
          'dark:bg-button-primary-dark',
          'dark:text-foreground-inverse-dark',
          'dark:hover:bg-button-primary-hover-dark',
          'dark:focus:bg-button-primary-dark',
          'dark:focus:border-brandGreen-30',
          'dark:active:border-transparent',
          'dark:disabled:bg-button-primary-disabled-dark',
          'dark:disabled:text-foreground-subtle'
        ],
        secondary: [
          'border-2',
          'bg-white',
          'text-grey-900',
          'border-border',
          'hover:bg-button-secondary-hover',
          'hover:border-button-secondary-border-hover',
          'focus:shadow-brandGreen',
          'active:border-border',
          'active:shadow-none',
          'disabled:bg-button-secondary-disabled',
          'disabled:border-button-secondary-border-disabled',
          'disabled:text-foreground-subtle',
          'dark:bg-button-secondary-dark',
          'dark:border-button-secondary-border-dark',
          'dark:text-white',
          'dark:hover:bg-button-secondary-hover-dark',
          'dark:hover:border-button-secondary-border-hover-dark',
          'dark:focus:bg-button-secondary-dark',
          'dark:focus:shadow-brandGreen10',
          'dark:active:border-button-secondary-border-dark',
          'dark:active:shadow-none',
          'dark:disabled:bg-button-secondary-disabled-dark',
          'dark:disabled:text-foreground-subtle-dark',
          'dark:disabled:border-button-secondary-disabled-dark'
        ]
      },
      size: {
        xl: ['px-4', 'py-3', 'text-xl', 'gap-2'],
        lg: ['px-4', 'py-3', 'text-lg', 'gap-2'],
        md: ['px-4', 'py-2.5', 'text-base', 'gap-1.5']
      }
    },
    compoundVariants: [
      { variant: 'secondary', size: 'xl', class: 'py-2.5' },
      { variant: 'secondary', size: 'lg', class: 'py-2.5' },
      { variant: 'secondary', size: 'md', class: 'py-2' }
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'lg'
    }
  }
)

export interface HeroButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heroButtonVariants> {
  leftSideChild?: React.ReactNode
  rightSideChild?: React.ReactNode
  leftSideClassName?: string
  rightSideClassName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  asChild?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const HeroButton = React.forwardRef<HTMLButtonElement, HeroButtonProps>(
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
      asChild = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const sideChildClassed =
      'inline-flex items-center justify-center text-inherit text-justify'

    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(heroButtonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled}
        onClick={e => {
          if (onClick) onClick(e)
        }}
        {...props}
      >
        {leftSideChild ? (
          <div className={cn(sideChildClassed, 'mr-3', leftSideClassName)}>
            {leftSideChild}
          </div>
        ) : (
          <></>
        )}
        <Slottable>{asChild ? children : <div>{children}</div>}</Slottable>
        {rightSideChild ? (
          <div className={cn(sideChildClassed, 'ml-3', rightSideClassName)}>
            {rightSideChild}
          </div>
        ) : (
          <></>
        )}
      </Comp>
    )
  }
)

HeroButton.displayName = 'HeroButton'

export { HeroButton, heroButtonVariants }

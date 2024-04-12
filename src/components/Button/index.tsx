import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-lg',
    'transition-colors',
    'focus-visible:outline-none',
    'disabled:pointer-events-none',
    'cursor-pointer',
    'disabled:cursor-default'
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-0',
          'bg-button-primary',
          'text-white',
          'border-button-primary',
          'hover:bg-button-primary-hover',
          'hover:border-button-primary-hover',
          'focus:bg-button-primary-focus',
          'focus:shadow-brandGreen',
          'active:border-transparent',
          'active:shadow-none',
          'disabled:bg-button-primary-disabled',
          'disabled:text-foreground-subtle',
          'disabled:border-button-primary-disabled',
          'selected:text-foreground-selected',
          'dark:bg-button-primary-dark',
          'dark:border-button-primary-dark',
          'dark:text-foreground-inverse-dark',
          'dark:hover:bg-button-primary-hover-dark',
          'dark:hover:border-button-primary-hover-dark',
          'dark:focus:bg-button-primary-dark',
          'dark:focus:border-brandGreen-30',
          'dark:active:border-transparent',
          'dark:disabled:bg-button-primary-disabled-dark',
          'dark:disabled:text-foreground-subtle',
          'dark:disabled:border-button-primary-disabled-dark'
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
        ],
        tertiary: [
          'bg-transparent border-transparent',
          'text-foreground',
          'dark:text-white',
          'hover:bg-button-tertiary-hover',
          'hover:dark:text-button-tertiary-hover-dark',
          'focus:bg-button-tertiary-focus',
          'focus:shadow-brandGreen',
          'active:bg-button-tertiary-hover',
          'active:shadow-none',
          'disabled:text-foreground-subtle'
        ],
        success: [
          'bg-button-success',
          'text-white',
          'hover:bg-button-success-hover',
          'focus:bg-button-success-focus',
          'focus:shadow-green',
          'active:shadow-none',
          'disabled:bg-button-success-disabled',
          'disabled:text-foreground-subtle'
        ],
        danger: [
          'bg-button-danger',
          'text-white',
          'hover:bg-button-danger-hover',
          'focus:bg-button-danger',
          'focus:shadow-red',
          'active:shadow-none',
          'disabled:bg-button-danger-disabled',
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
    compoundVariants: [
      { variant: 'secondary', size: 'lg', class: 'py-2.5' },
      { variant: 'secondary', size: 'md', class: 'py-2' },
      { variant: 'secondary', size: 'sm', class: 'py-1.5' },
      { variant: 'secondary', size: 'xs', class: 'py-2' }
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftSideChild?: React.ReactNode;
  rightSideChild?: React.ReactNode;
  leftSideClassName?: string;
  rightSideClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  asChild?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
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
    const sideChildClassed =
      'inline-flex items-center justify-center text-inherit text-justify';

    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled}
        onClick={e => {
          if (onClick) onClick(e);
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
        <div>{children}</div>
        {rightSideChild ? (
          <div className={cn(sideChildClassed, 'ml-3', rightSideClassName)}>
            {rightSideChild}
          </div>
        ) : (
          <></>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

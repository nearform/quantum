import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonGroupVariants = cva(
  [
    'inline-flex',
    'items-start',
    'p-0',
    'rounded-lg',
    '[&>*]:flex',
    '[&>*]:items-center',
    '[&>*]:justify-center',
    '[&>*]:gap-[10px]',
    '[&>*]:px-3',
    '[&>*]:outline-hidden',
    '[&>*:focus]:shadow-brandGreen',
    '[&>*:focus]:z-10'
  ],
  {
    variants: {
      variant: {
        primary: [
          '[&>*]:bg-button-primary',
          '[&>*]:text-white',
          '[&>*:hover]:bg-button-primary-hover',
          '[&>*:focus]:bg-button-primary-focus',
          '[&>*:disabled]:bg-button-primary-disabled',
          '[&>*:disabled]:text-foreground-subtle',
          'dark:[&>*]:bg-button-primary-dark',
          'dark:[&>*]:text-foreground-inverse-dark',
          'dark:[&>*:hover]:bg-button-primary-hover-dark',
          'dark:[&>*:focus]:bg-button-primary-dark',
          'dark:[&>*:disabled]:bg-button-primary-disabled-dark',
          'dark:[&>*:disabled]:text-foreground-subtle'
        ],
        secondary: [
          '[&>*]:bg-white',
          '[&>*]:text-grey-900',
          '[&>*:hover]:bg-button-secondary-hover',
          '[&>*:disabled]:bg-button-secondary-disabled',
          '[&>*:disabled]:border-button-secondary-border-disabled',
          '[&>*:disabled]:text-foreground-subtle',
          'dark:[&>*]:bg-button-secondary-dark',
          'dark:[&>*]:text-foreground-dark',
          'dark:[&>*:hover]:bg-button-secondary-hover-dark',
          'dark:[&>*:focus]:shadow-brandGreen10',
          'dark:[&>*:disabled]:bg-button-secondary-disabled-dark',
          'dark:[&>*:disabled]:border-button-secondary-disabled-dark',
          'dark:[&>*:disabled]:text-foreground-subtle-dark'
        ]
      },
      orientation: {
        horizontal: [
          'inline-flex',
          '[&>*:first-child]:rounded-l-lg',
          '[&>*:last-child]:rounded-r-lg',
          '[&>*:not(:first-child)]:rounded-l-none',
          '[&>*:not(:last-child)]:rounded-r-none'
        ],
        vertical: [
          'flex-col',
          '[&>*]:self-stretch',
          '[&>*:first-child]:rounded-t-lg',
          '[&>*:last-child]:rounded-b-lg',
          '[&>*:not(:first-child)]:rounded-t-none',
          '[&>*:not(:last-child)]:rounded-b-none'
        ]
      },
      size: {
        md: ['[&>*]:py-2.5'],
        sm: ['[&>*]:py-2']
      }
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'primary',
      size: 'md'
    }
  }
)

interface ButtonGroupProps
  extends
    React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof buttonGroupVariants> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { className, orientation, variant, size, role = 'group', ...props },
    ref
  ) => {
    return (
      <div
        role={role}
        className={cn(
          buttonGroupVariants({ orientation, variant, size }),
          className
        )}
        {...props}
        ref={ref}
      ></div>
    )
  }
)
ButtonGroup.displayName = 'ButtonGroup'
export { ButtonGroup, type ButtonGroupProps }

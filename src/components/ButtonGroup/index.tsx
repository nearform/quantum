import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonGroupVariants = cva(
  [
    'inline-flex',
    '[&>*]:flex',
    '[&>*]:rounded-none',
    '[&>*]:border-0',
    'divide-border-subtle',
    'p-0',
    '[&>*]:gap-[10px]',
    '[&>*]:items-center',
    '[&>*]:justify-center',
    '[&>*]:px-3',
    'items-start',
    'rounded-lg',
    'overflow-hidden'
  ],
  {
    variants: {
      variant: {
        primary: [
          'dark:divide-border-subtle-dark',
          'dark:[&>*]:bg-button-primary-dark',
          'dark:[&>*]:text-foreground-inverse-dark',
          'dark:[&>*:hover]:bg-button-secondary-hover',
          'dark:[&>*:focus]:bg-button-secondary-focus'
        ],
        secondary: [
          'bg-background',
          'border-[1px] border-border-subtle',
          '[&>*]:bg-white [&>*]:text-grey-900',
          '[&>*:focus]:bg-button-secondary-focus',
          '[&>*:hover]:bg-button-secondary-hover',
          '[&>*:disabled]:bg-button-secondary-disabled [&>*:disabled]:border-button-secondary-border-disabled [&>*:disabled]:text-foreground-subtle'
        ]
      },
      orientation: {
        horizontal: ['inline-flex', 'divide-x-[1px]'],
        vertical: ['flex-col', 'divide-y-[1px]', '[&>*]:self-stretch']
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
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof buttonGroupVariants> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, variant, size, ...props }, ref) => {
    return (
      <div
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

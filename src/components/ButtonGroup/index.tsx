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
    'rounded-xl',
    'overflow-hidden'
  ],
  {
    variants: {
      variant: {
        primary: [
          'dark:divide-border-subtle-dark',
          'dark:[&>*]:bg-button-primary-dark',
          'dark:[&>*]:text-foreground-inverse-dark'
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
        horizontal: [
          'inline-flex',
          'divide-x-[1px]'
          // '[&>*:first-child]:rounded-l-lg',
          // '[&>*:last-child]:rounded-r-lg'
        ],
        vertical: [
          'flex-col',
          'divide-y-[1px]',
          // '[&>*:first-child]:rounded-t-lg',
          // '[&>*:last-child]:rounded-b-lg',
          '[&>*]:self-stretch'
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
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof buttonGroupVariants> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, variant, ...props }, ref) => {
    return (
      <div
        className={cn(buttonGroupVariants({ orientation, variant }), className)}
        {...props}
        ref={ref}
      ></div>
    )
  }
)
ButtonGroup.displayName = 'ButtonGroup'
export { ButtonGroup, type ButtonGroupProps }

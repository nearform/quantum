import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

// instead lets make the div have a curved

const buttonGroupVariants = cva(
  ['flex', '[&>*]:rounded-none', '[&>*]:border-0 divide-border-subtle'],
  {
    variants: {
      variant: {
        primary: [],
        secondary: [
          'border-[1px] border-border-subtle',
          '[&>*]:bg-white [&>*]:text-grey-900',
          '[&>*:focus]:bg-button-secondary-focus',
          '[&>*:hover]:bg-button-secondary-hover',
          '[&>*:disabled]:bg-button-secondary-disabled [&>*:disabled]:border-button-secondary-border-disabled [&>*:disabled]:text-foreground-subtle'
        ]
      },
      orientation: {
        horizontal: [
          'flex-row',
          'divide-x-[1px]',
          'rounded-l-lg',
          'rounded-r-lg',
          '[&>*:first-child]:rounded-l-lg',
          '[&>*:last-child]:rounded-r-lg'
        ],
        vertical: [
          'flex-col',
          'divide-y-[1px]',
          'rounded-t-lg',
          'rounded-b-lg',
          '[&>*:first-child]:border-0',
          '[&>*:first-child]:rounded-t-lg',
          '[&>*:last-child]:rounded-b-lg'
        ]
      }
    },
    defaultVariants: {
      orientation: 'horizontal'
    }
  }
)
import { cn } from '@/lib/utils'

interface ButtonGroupProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof buttonGroupVariants> {
  variant?: 'primary' | 'secondary'
}

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

import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { BsArrowLeft } from '../../assets/index.ts'
import { cn } from '../../lib/utils.ts'

const backLinkVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'rounded-sm',
    'text-sm font-semibold leading-normal',
    'text-foreground dark:text-foreground-dark',
    'cursor-pointer',
    'hover:underline',
    'focus-visible:outline-hidden focus-visible:underline',
    'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10'
  ],
  {
    variants: {
      size: {
        md: 'px-2 py-1',
        sm: 'p-1.5'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

interface BackLinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof backLinkVariants> {
  asChild?: boolean
}

const BackLink = React.forwardRef<HTMLAnchorElement, BackLinkProps>(
  ({ className, size, asChild = false, children = 'Back', ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    const renderLabel = (label: React.ReactNode) => (
      <span className={size === 'sm' ? 'sr-only' : undefined}>{label}</span>
    )

    return (
      <Comp
        ref={ref}
        className={cn(backLinkVariants({ size }), className)}
        {...props}
      >
        <BsArrowLeft className="h-3 w-3 shrink-0" aria-hidden="true" />
        <Slottable>
          {asChild &&
          React.isValidElement<{ children?: React.ReactNode }>(children)
            ? React.cloneElement(
                children,
                undefined,
                renderLabel(children.props.children ?? 'Back')
              )
            : renderLabel(children)}
        </Slottable>
      </Comp>
    )
  }
)
BackLink.displayName = 'BackLink'

export { BackLink, backLinkVariants, type BackLinkProps }

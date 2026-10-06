import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { BsArrowLeft } from '../../assets'
import { cn } from '../../lib/utils'

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
    VariantProps<typeof backLinkVariants> {}

const BackLink = React.forwardRef<HTMLAnchorElement, BackLinkProps>(
  ({ className, size, children = 'Back', ...props }, ref) => (
    <a
      ref={ref}
      className={cn(backLinkVariants({ size }), className)}
      {...props}
    >
      <BsArrowLeft className="h-3 w-3 shrink-0" aria-hidden="true" />
      <span className={size === 'sm' ? 'sr-only' : undefined}>{children}</span>
    </a>
  )
)
BackLink.displayName = 'BackLink'

export { BackLink, backLinkVariants, type BackLinkProps }

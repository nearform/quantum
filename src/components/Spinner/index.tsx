import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils.ts'

const spinnerVariants = cva(
  [
    'block',
    'shrink-0',
    'rounded-full',
    'border-current',
    'border-t-transparent',
    'animate-spin',
    'motion-reduce:animate-pulse',
    'forced-color-adjust-none'
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4 border-2',
        default: 'h-5 w-5 border-2',
        lg: 'h-8 w-8 border-[3px]'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

interface SpinnerProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'role' | 'children'>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, label, ...props }, ref) => {
    const hasLabel = label != null && label.trim() !== ''

    return (
      <span
        ref={ref}
        role={hasLabel ? 'status' : undefined}
        // `status` takes its name from the author, never from its content, so
        // the hidden text alone leaves it unnamed to getByRole and to the
        // accessibility tree. The text stays so the region announces it.
        aria-label={hasLabel ? label : undefined}
        aria-hidden={hasLabel ? undefined : true}
        className={cn('inline-flex items-center justify-center', className)}
        {...props}
      >
        <span
          aria-hidden="true"
          data-spinner-ring=""
          className={spinnerVariants({ size })}
        />
        {hasLabel && <span className="sr-only">{label}</span>}
      </span>
    )
  }
)
Spinner.displayName = 'Spinner'

export { Spinner, spinnerVariants, type SpinnerProps }

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils.ts'

type SeparatorOrientation = 'horizontal' | 'vertical'

const separatorLineVariants = cva(
  ['shrink-0', 'border-border-subtle', 'dark:border-border-subtle-dark'],
  {
    variants: {
      orientation: {
        horizontal: 'h-0 w-full border-t',
        vertical: 'w-0 min-h-4 self-stretch border-l'
      }
    },
    defaultVariants: {
      orientation: 'horizontal'
    }
  }
)

interface SeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
  'children' | 'asChild'
> {
  label?: React.ReactNode
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      label,
      ...props
    },
    ref
  ) => {
    const labelId = React.useId()
    const hasLabel = label != null && label !== false && label !== ''

    if (!hasLabel) {
      return (
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation={orientation}
          className={cn(separatorLineVariants({ orientation }), className)}
          {...props}
        />
      )
    }

    const line = (
      <span
        aria-hidden="true"
        data-separator-line=""
        className={cn(separatorLineVariants({ orientation }), 'flex-1')}
      />
    )

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        aria-labelledby={decorative ? undefined : labelId}
        className={cn(
          'flex items-center gap-3',
          orientation === 'horizontal'
            ? 'w-full flex-row'
            : 'flex-col self-stretch',
          className
        )}
        {...props}
      >
        {line}
        <span
          id={labelId}
          data-separator-label=""
          className="shrink-0 text-sm text-foreground-muted dark:text-foreground-muted-dark"
        >
          {label}
        </span>
        {line}
      </SeparatorPrimitive.Root>
    )
  }
)
Separator.displayName = 'Separator'

export {
  Separator,
  separatorLineVariants,
  type SeparatorOrientation,
  type SeparatorProps
}

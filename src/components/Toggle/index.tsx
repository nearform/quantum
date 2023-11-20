import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// width of box = 40px. width of circle = 16px, centered at 8px.

const toggleVariants = cva(
  [
    [
      'flex',
      'justify-start',
      'items-center',
      'rounded-[40px]',
      'py-[2px]',
      'px-[2.5px]',
      'ring-offset-background',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
      'fill-white'
    ],
    ['data-[state=off]:bg-foreground-subtle', 'data-[state=on]:bg-accent'],
    [
      'dark:data-[state=on]:bg-blue-300', //TODO: change to accent/default after design update
      'dark:[&>svg]:fill-foreground-inverse-dark'
    ],
    [
      '[&>*]:transition-all',
      '[&>*]:ease-in-out',
      '[&>.toggle-push]:data-[state=on]:flex-grow'
    ]
  ],
  {
    variants: {
      variant: {
        default: 'bg-transparent'
      },
      size: {
        default: 'h-5 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  >
    <div className="bg-transparent toggle-push"></div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="inherit"
    >
      <circle cx="8.5" cy="8" r="8" fill="inherit" />
    </svg>
  </TogglePrimitive.Root>
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

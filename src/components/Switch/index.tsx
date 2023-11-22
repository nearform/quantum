import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const switchVariants = cva([
  [
    'peer',
    'inline-flex',
    'h-5',
    'py-0.5',
    'w-10',
    'gap-[8px]',
    'shrink-0',
    'cursor-pointer',
    'items-center',
    'rounded-full',
    'border-none',
    'transition-colors ',
    'focus-visible:outline-none',
    'focus-visible:shadow-blue',
    'disabled:cursor-not-allowed'
  ],
  [
    'dark:data-[state=checked]:bg-blue-300', //TODO: change to accent/dark when colour changes are made
    'dark:bg-foreground-subtle-dark',
    'dark:disabled:bg-grey-200'
  ],
  [
    'data-[state=checked]:bg-accent',
    'data-[state=unchecked]:bg-foreground-subtle',
    'data-[disabled]:bg-grey-200'
  ]
])

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants(), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn([
        'pointer-events-none',
        'block',
        'h-4',
        'w-4',
        'rounded-full',
        'bg-background',
        'ring-0',
        'transition-transform ',
        'data-[state=checked]:translate-x-[22px]',
        'data-[state=unchecked]:translate-x-[2px]',
        'data-[disabled]:bg-grey-300',
        'dark:bg-black',
        'dark:data-[disabled]:bg-grey-300'
      ])}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

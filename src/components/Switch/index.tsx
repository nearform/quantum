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
    'focus-visible:outline-hidden',
    'focus-visible:border-brandBlue-100',
    'focus-visible:ring-[3px]',
    'focus-visible:ring-brandBlue-10',
    'disabled:cursor-not-allowed'
  ],
  [
    'dark:enabled:data-[state=checked]:bg-brandGreen-100',
    'dark:enabled:bg-brandMidnight-30',
    'dark:disabled:bg-grey-200',
    'dark:focus-visible:border-brandBlue-80',
    'dark:focus-visible:ring-0',
    'dark:focus-visible:outline-solid',
    'dark:focus-visible:outline-2',
    'dark:focus-visible:outline-offset-2',
    'dark:focus-visible:outline-brandGreen-100'
  ],
  [
    'enabled:data-[state=checked]:bg-brandGreen-100',
    'enabled:bg-brandGrey-30',
    'disabled:bg-brandGrey-10'
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
        'bg-brandMidnight-100',
        'ring-0',
        'transition-transform ',
        'data-[state=checked]:translate-x-[22px]',
        'data-[state=unchecked]:translate-x-[2px]',
        'data-[disabled]:bg-brandMidnight-30',
        'dark:bg-brandMidnight-100',
        'dark:data-[disabled]:bg-brandMidnight-30'
      ])}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

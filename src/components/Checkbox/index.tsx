import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@/lib/utils'
import { BsCheck, BsDash } from '@/assets'
import { cva } from 'class-variance-authority'
const checkboxVariants = cva([
  [
    'peer',
    'h-5 w-5',
    'p-0.5',
    'shrink-0',
    'gap-0',
    'rounded',
    'border',
    'border-border',
    'bg-background-alt'
  ],
  [
    'data-[state=checked]:border-border',
    'data-[state=checked]:bg-border',
    'data-[state=checked]:text-foreground-inverse',
    'data-[state=indeterminate]:bg-border',
    'data-[state=indeterminate]:text-foreground-inverse'
  ],
  [
    'dark:data-[state=unchecked]:bg-background-alt-dark',
    'dark:data-[state=unchecked]:border-border-dark',
    'dark:data-[state=checked]:border-border-dark',
    'dark:data-[state=checked]:bg-border-dark'
  ]
])

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants(), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-inherit')}
    >
      {(props.checked === true || props.checked === undefined) && (
        <BsCheck className="text-inherit stroke-current stroke-1 fill-current" />
      )}
      {props.checked === 'indeterminate' && (
        <BsDash className="text-inherit stroke-current stroke-1 fill-current" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, type CheckboxProps }

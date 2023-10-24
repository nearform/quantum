import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@/lib/utils'
import { Check, Minus } from '@/assets/index'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 p-0.5 shrink-0 gap-0 rounded border border-border-default data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-foreground-inverse data-[state=indeterminate]:border-blue-600 data-[state=indeterminate]:bg-blue-600 data-[state=indeterminate]:text-foreground-inverse',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-inherit')}
    >
      {(props.checked === true || props.checked === undefined) && (
        <Check className="text-inherit stroke-current stroke-1 fill-current" />
      )}
      {props.checked === 'indeterminate' && (
        <Minus className="text-inherit stroke-current stroke-3 fill-current" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

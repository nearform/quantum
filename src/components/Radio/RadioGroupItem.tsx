import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { BsCircleFill } from '@/assets'

type RadioGroupItemProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
>

const radioVariant = cva([
  [
    'h-5 w-5',
    'rounded-full',
    'border-[0.533px]',
    'border-border',
    'bg-background-alt',
    'disabled:opacity-50',
    'text-foreground-inverse'
  ],
  [
    'data-[state=checked]:border-primary-600',
    'data-[state=checked]:bg-primary-600',
    'data-[state=checked]:bg-primary-600'
  ],
  ['dark:bg-background-alt-dark', 'dark:border-border-dark']
])

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioVariant(), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <BsCircleFill
          size="8"
          className="text-inherit stroke-current stroke-1 fill-current"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroupItem as Radio, RadioGroupItemProps }

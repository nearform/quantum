import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const trackVariants = cva([
  [
    'relative',
    'grow',
    'h-1.5',
    'w-full',
    'overflow-hidden',
    'rounded-full',
    'bg-grey-200'
  ],
  ['dark:bg-grey-600']
])

const rangeVariants = cva([
  ['absolute', 'h-full', 'rounded-full', 'bg-accent'],
  ['dark:bg-accent-dark']
])

const thumbVariants = cva([
  [
    'block',
    'h-4',
    'w-4',
    'rounded-full',
    'bg-accent',
    'border-2',
    'border-white',
    'shadow-sm',
    'transition-colors',
    'focus-visible:outline-hidden',
    'focus-visible:shadow-brandGreen',
    'disabled:pointer-events-none',
    'disabled:bg-grey-300'
  ],
  [
    'dark:bg-accent-dark',
    'dark:border-grey-900',
    'dark:focus-visible:shadow-brandGreen10',
    'dark:disabled:bg-grey-300'
  ]
])

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      'data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className={cn(trackVariants())}>
      <SliderPrimitive.Range className={cn(rangeVariants())} />
    </SliderPrimitive.Track>
    {(props.value ?? props.defaultValue ?? [0]).map((_, i) => (
      <SliderPrimitive.Thumb key={i} className={cn(thumbVariants())} />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

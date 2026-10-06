import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '../../lib/utils'
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

const endLabelVariants = cva([
  ['text-sm', 'text-foreground-muted', 'tabular-nums'],
  ['dark:text-foreground-muted-dark']
])

const labelVariants = cva([
  ['text-sm', 'font-medium', 'leading-normal', 'text-foreground'],
  ['dark:text-foreground-inverse']
])

const hintVariants = cva([
  ['text-xs', 'font-semibold', 'text-foreground-muted'],
  ['dark:text-foreground-muted-dark']
])

type SliderProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  'orientation'
> & {
  label?: string
  hintText?: string
  minLabel?: React.ReactNode
  maxLabel?: React.ReactNode
  endLabelPosition?: 'inline' | 'below'
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      label,
      hintText,
      minLabel,
      maxLabel,
      endLabelPosition = 'inline',
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const labelId = label ? `${generatedId}-label` : undefined
    const thumbLabelledBy = ariaLabelledBy ?? labelId

    const hasEndLabels = minLabel != null || maxLabel != null

    const slider = (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          'data-[disabled]:opacity-50'
        )}
        {...props}
      >
        <SliderPrimitive.Track className={cn(trackVariants())}>
          <SliderPrimitive.Range className={cn(rangeVariants())} />
        </SliderPrimitive.Track>
        {(props.value ?? props.defaultValue ?? [0]).map((_, i, arr) => {
          const suffix =
            arr.length > 1 ? (i === 0 ? ' (minimum)' : ' (maximum)') : ''
          return (
            <SliderPrimitive.Thumb
              key={i}
              className={cn(thumbVariants())}
              aria-label={
                !thumbLabelledBy ? `${ariaLabel ?? ''}${suffix}` : undefined
              }
              aria-labelledby={thumbLabelledBy}
            />
          )
        })}
      </SliderPrimitive.Root>
    )

    const track = hasEndLabels ? (
      endLabelPosition === 'below' ? (
        <div className="flex w-full flex-col gap-1">
          {slider}
          <div className="flex justify-between">
            <span className={cn(endLabelVariants())}>{minLabel ?? ''}</span>
            <span className={cn(endLabelVariants())}>{maxLabel ?? ''}</span>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center gap-3">
          {minLabel != null && (
            <span className={cn(endLabelVariants())}>{minLabel}</span>
          )}
          {slider}
          {maxLabel != null && (
            <span className={cn(endLabelVariants())}>{maxLabel}</span>
          )}
        </div>
      )
    ) : (
      slider
    )

    if (!label) return <div className={cn('w-full', className)}>{track}</div>

    return (
      <div className={cn('flex w-full flex-col gap-2', className)}>
        <div className="flex flex-col">
          <span id={labelId} className={cn(labelVariants())}>
            {label}
          </span>
          {hintText && <span className={cn(hintVariants())}>{hintText}</span>}
        </div>
        {track}
      </div>
    )
  }
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
export type { SliderProps }

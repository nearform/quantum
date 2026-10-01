'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { BsChevronDown } from '@/assets'
import { cn } from '@/lib/utils'

import { SelectContent, SelectItem } from '../Select'

const SortAndShow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3',
      'rounded-lg bg-background-surface dark:bg-background-surface-dark',
      className
    )}
    {...props}
  />
))
SortAndShow.displayName = 'SortAndShow'

interface SortAndShowOption {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

interface SortAndShowControlProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
  'children'
> {
  label: React.ReactNode
  options: SortAndShowOption[]
  className?: string
}

const SortAndShowControl = React.forwardRef<
  HTMLButtonElement,
  SortAndShowControlProps
>(({ label, options, className, ...props }, ref) => {
  const labelId = React.useId()

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 text-xs leading-normal',
        className
      )}
    >
      <span
        id={labelId}
        className="font-semibold text-foreground dark:text-foreground-dark"
      >
        {label}
      </span>
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          ref={ref}
          aria-labelledby={labelId}
          className={cn(
            'inline-flex min-h-6 items-center gap-1.5 rounded px-1 -mx-1',
            'text-foreground dark:text-foreground-dark',
            'cursor-pointer outline-hidden',
            'hover:bg-background-alt dark:hover:bg-background-alt-dark',
            'data-[state=open]:bg-background-alt dark:data-[state=open]:bg-background-alt-dark',
            'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon asChild>
            <BsChevronDown className="h-2.5 w-2.5 shrink-0" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectContent align="start">
          {options.map(option => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="text-xs"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPrimitive.Root>
    </div>
  )
})
SortAndShowControl.displayName = 'SortAndShowControl'

export {
  SortAndShow,
  SortAndShowControl,
  type SortAndShowControlProps,
  type SortAndShowOption
}

'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { AngleDownIcon, CheckIcon } from '@/assets'
import * as ScrollArea from '@radix-ui/react-scroll-area'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectPortal = SelectPrimitive.Portal

const triggerVariants = cva(
  [
    [
      'flex',
      'h-10',
      'w-full',
      'border border-[2px]',
      'text-foreground',
      'items-center',
      'justify-between',
      'rounded-lg',
      'px-3',
      'py-2',
      'text-sm',
      'focus:outline-none',
      'focus-visible:shadow-blue',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      '[&>span]:line-clamp-1'
    ]
  ],
  {
    variants: {
      variant: {
        default: [
          'text-foreground',
          'border-border-subtle',
          'hover:border-border-hover',
          'hover:text-foreground',
          'focus-visible:shadow-blue',
          'dark:bg-background-alt-dark',
          'dark:border-border-subtle-dark',
          'dark:text-foreground-muted-dark',
          'data-[placeholder]:text-foreground-muted'
        ],
        error: [
          'bg-red-50',
          'border-feedback-red',
          'hover:border-red-700',
          'focus-visible:shadow-red',
          'text-red-700'
        ],
        success: [
          'bg-green-50',
          'border-feedback-green',
          'hover:border-green-700',
          'focus-visible:shadow-green',
          'text-green-700'
        ]
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface TriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof triggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  TriggerProps
>(({ variant, className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(triggerVariants({ variant }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <AngleDownIcon className="h-2 w-2" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const contentVariants = cva([
  'relative',
  'z-50',
  'min-w-[8rem]',
  'bg-background',
  'rounded-lg',
  'border border-[2px]',
  'border-border-subtle',
  'text-foreground',
  'shadow',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2',
  'dark:bg-background-dark',
  'dark:border-border-subtle-dark',
  'dark:text-foreground-dark'
])
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        contentVariants(),
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <ScrollArea.Root className="h-[var(--radix-)]" type="auto">
        <SelectPrimitive.Viewport
          asChild
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-content-available-height)] max-h-96 w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          <ScrollArea.Viewport>{children}</ScrollArea.Viewport>
        </SelectPrimitive.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" className="w-3 pr-1 py-2">
          <ScrollArea.Thumb className="bg-grey-200 w-2 rounded-lg" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-2 px-4 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const itemVariants = cva([
  'relative',
  'flex',
  'w-full',
  'cursor-default',
  'select-none',
  'items-center',
  'py-2',
  'px-4',
  'text-sm',
  'outline-none',
  'data-[disabled]:pointer-events-none',
  'data-[disabled]:opacity-50',
  'hover:bg-background-alt',
  'focus-visible:shadow-blue',
  'dark:focus-visible:shadow-blue',
  'dark:hover:bg-background-alt-dark'
])

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(itemVariants(), className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5  items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-3 w-3" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      '-mx-1 my-1 h-px bg-border-subtle dark:bg-border-subtle-dark',
      className
    )}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectPortal
}

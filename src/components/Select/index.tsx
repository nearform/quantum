'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { AngleDownIcon, CheckIcon } from '@/assets'
import * as ScrollArea from '@radix-ui/react-scroll-area'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectPortal = SelectPrimitive.Portal

const triggerVariants = cva([
  [
    'flex',
    'h-10',
    'w-full',
    'text-foreground',
    'items-center',
    'justify-between',
    'rounded-lg',
    'border border-[2px]',
    'border-border-subtle',
    'bg-background-alt',
    'px-3',
    'py-2 ',
    'text-sm',
    'focus:outline-none',
    'focus-visible:shadow-blue',
    'placeholder:text-muted-foreground',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    '[&>span]:line-clamp-1'
  ],
  [
    'dark:bg-background-alt-dark',
    'dark:border-border-subtle-dark',
    'dark:text-foreground-muted-dark'
  ]
])

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(triggerVariants(), className)}
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
  'max-h-[var(--radix-select-content-available-height)]',
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
      <ScrollArea.Root className="w-full h-full" type="auto">
        <SelectPrimitive.Viewport
          asChild
          className={cn(
            'p-1 w-full h-full',
            position === 'popper' &&
              'h-[var(--radix-select-content-available-height)] w-full min-w-[var(--radix-select-trigger-width)]'
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
    className={cn('-mx-1 my-1 h-px bg-border-subtle', className)}
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

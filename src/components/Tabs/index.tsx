'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const tabsVariants = cva([
  'flex',
  'gap-4',
  'data-[orientation=horizontal]:flex-col',
  'data-[orientation=vertical]:flex-row'
])

const tabsListVariants = cva([
  'inline-flex',
  'gap-1',
  'data-[orientation=horizontal]:flex-row',
  'data-[orientation=horizontal]:items-center',
  'data-[orientation=vertical]:flex-col',
  'data-[orientation=vertical]:items-stretch'
])

const tabsTriggerVariants = cva(
  [
    'group',
    'inline-flex',
    'items-center',
    'gap-2',
    'rounded-lg',
    'font-semibold',
    'whitespace-nowrap',
    'transition-colors',
    'outline-hidden',
    'cursor-pointer',
    'data-[orientation=vertical]:justify-start',
    'text-foreground',
    'hover:bg-background-subtle',
    'focus-visible:bg-background-subtle',
    'focus-visible:shadow-brandGreen',
    'data-[state=active]:bg-accent',
    'data-[state=active]:text-foreground-inverse',
    'disabled:cursor-default',
    'disabled:pointer-events-none',
    'disabled:text-foreground-subtle',
    'dark:text-foreground-dark',
    'dark:hover:bg-background-subtle-dark',
    'dark:focus-visible:bg-background-subtle-dark',
    'dark:focus-visible:shadow-brandGreen10',
    'dark:data-[state=active]:bg-accent-dark',
    'dark:data-[state=active]:text-foreground-inverse-dark',
    'dark:disabled:text-foreground-subtle-dark',
    '[&_svg]:shrink-0'
  ],
  {
    variants: {
      size: {
        md: ['px-4', 'py-2', 'text-sm', '[&_svg]:size-4'],
        sm: ['px-3', 'py-1.5', 'text-xs', '[&_svg]:size-3.5']
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

const tabsCountVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-full',
    'border',
    'border-border-subtle',
    'bg-background',
    'text-foreground',
    'font-semibold',
    'tabular-nums',
    'dark:border-transparent',
    'dark:group-data-[state=active]:bg-background-dark',
    'dark:group-data-[state=active]:text-foreground-dark'
  ],
  {
    variants: {
      size: {
        md: ['min-w-5', 'h-5', 'px-1.5', 'text-xs'],
        sm: ['min-w-4', 'h-4', 'px-1', 'text-[10px]']
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

const tabsContentVariants = cva([
  'flex-1',
  'rounded-lg',
  'outline-hidden',
  'focus-visible:shadow-brandGreen',
  'dark:focus-visible:shadow-brandGreen10'
])

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn(tabsVariants(), className)}
    {...props}
  />
))
Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants(), className)}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

interface TabsTriggerProps
  extends
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  count?: React.ReactNode
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size, count, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ size }), className)}
    {...props}
  >
    <Slottable>{children}</Slottable>
    {count != null && typeof count !== 'boolean' && (
      <span className={tabsCountVariants({ size })}>{count}</span>
    )}
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants(), className)}
    {...props}
  />
))
TabsContent.displayName = 'TabsContent'

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsVariants,
  tabsListVariants,
  tabsTriggerVariants,
  type TabsTriggerProps
}

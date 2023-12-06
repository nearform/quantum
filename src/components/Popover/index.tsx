'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as Separator from '@radix-ui/react-separator'
import { cva, type VariantProps } from 'class-variance-authority'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { cn } from '@/lib/utils'

const popoverVariants = cva([
  'z-50',
  'border border-[1px] border-border-subtle dark:border-border-dark',
  'rounded-lg',
  'bg-background dark:bg-background-dark',
  'text-foreground text-sm font-normal dark:text-white',
  'shadow',
  'outline-none',
  'overflow-scroll',
  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:fade-in-0',
  'data-[state=closed]:zoom-out-95',
  'data-[state=open]:zoom-in-95',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2'
])

const separatorVariants = cva([])

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

export interface PopoverProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>,
    VariantProps<typeof popoverVariants> {}

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof Separator.Root>,
    VariantProps<typeof separatorVariants> {}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
  (
    { className, align = 'center', sideOffset = 4, children, ...props },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(popoverVariants(), className)}
        {...props}
      >
        <ScrollArea.Root className="w-full h-full" type="auto">
          <ScrollArea.Viewport className="w-full h-full gap-3 [&>*]:[&>*]:py-2 [&>*]:[&>*]:px-4">
            {children}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="w-3 pr-1 py-2"
          >
            <ScrollArea.Thumb className="bg-grey-200 w-2 rounded-lg" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const PopoverSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className="w-full -my-2 ">
    <SeparatorPrimitive.Root
      ref={ref}
      decorative
      orientation="horizontal"
      className={cn(
        'shrink-0 bg-border-subtle dark:bg-border-dark h-[1px] w-[full] -mx-4',
        className
      )}
      {...props}
    />
  </div>
))
PopoverSeparator.displayName = SeparatorPrimitive.Root.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverSeparator }

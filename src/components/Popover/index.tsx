'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cva, type VariantProps } from 'class-variance-authority'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { cn } from '@/lib/utils'

const popoverVariants = cva([
  'z-50',
  'border border-2 border-border-subtle dark:border-border-dark',
  'rounded-lg',
  'bg-background dark:bg-background-dark',
  'text-foreground text-sm font-normal dark:text-white',
  'shadow',
  'outline-none',
  'min-w-72',
  'p-4'
])

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverClose = PopoverPrimitive.Close

export interface PopoverProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>,
    VariantProps<typeof popoverVariants> {}

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
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

type PopoverScrollAreaProps = React.PropsWithChildren<{
  className?: string
}>

const PopoverScrollArea: React.FC<PopoverScrollAreaProps> = ({
  className,
  children
}) => {
  return (
    <ScrollArea.Root className={cn('w-full h-full', className)} type="auto">
      <ScrollArea.Viewport className="w-full h-full">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="w-3 pr-1 py-2 -mr-4"
      >
        <ScrollArea.Thumb className="bg-grey-200 w-2 rounded-lg" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

interface PopoverSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  fullLength?: boolean
}

const PopoverSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  PopoverSeparatorProps
>(
  (
    { className, orientation = 'horizontal', fullLength = false, ...props },
    ref
  ) => (
    <div className="w-full">
      <SeparatorPrimitive.Root
        ref={ref}
        decorative
        orientation={orientation}
        className={cn(
          'shrink-0 bg-border-subtle dark:bg-border-dark',
          orientation === 'horizontal' ? 'h-[1px] w-fill' : 'h-fill w-[1px]',
          fullLength && orientation === 'horizontal' ? '-mx-4' : '',
          className
        )}
        {...props}
      />
    </div>
  )
)
PopoverSeparator.displayName = SeparatorPrimitive.Root.displayName

interface PopoverHeaderProps {
  header: string
  subHeader?: string
}

const PopoverHeader: React.FC<PopoverHeaderProps> = ({ header, subHeader }) => {
  return (
    <>
      <div className="pb-4">
        <h1 className="font-semibold text-sm">{header}</h1>
        <h2 className="font-normal text-sm">{subHeader}</h2>
      </div>
      <PopoverSeparator fullLength />
    </>
  )
}

type PopoverFooterProps = React.PropsWithChildren<{
  className?: string
}>

const PopoverFooter: React.FC<PopoverFooterProps> = ({
  className,
  children
}) => {
  return (
    <div className="w-full -mb-4">
      <PopoverSeparator fullLength />
      <div className={className}>{children}</div>
    </div>
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverScrollArea,
  PopoverHeader,
  PopoverFooter,
  PopoverSeparator,
  PopoverClose
}

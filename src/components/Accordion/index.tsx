'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { AngleDownIcon } from '@/assets'

import { cn } from '@/lib/utils'

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Root
    className={cn('dark:bg-grey-900 bg-white px-5 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5', className)}
    {...props}
    ref={ref}
  >{children}
  </AccordionPrimitive.Root>
));
Accordion.displayName = AccordionPrimitive.Root.displayName

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Item
    className={cn('overflow-hidden first:mt-0 first:rounded-t last:rounded-b border-b border-grey-200 dark:border-grey-700 last:border-0', className)}
    {...props}
    ref={ref}
  >{children}
  </AccordionPrimitive.Item>
));
AccordionItem.displayName = AccordionPrimitive.Item.displayName

const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Header
    className={cn('flex', className)}
    {...props}
    ref={ref}
  >{children}
  </AccordionPrimitive.Header>
));
AccordionHeader.displayName = AccordionPrimitive.Header.displayName

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, ref) => (
  <AccordionHeader>
    <AccordionPrimitive.Trigger
      className={cn('dark:bg-grey-900 dark:text-white group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white text-[15px] leading-none', className)}
      {...props}
      ref={ref}
    >
      {children}
      <AngleDownIcon className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180 w-3 h-3 text-gray-800" aria-hidden />
    </AccordionPrimitive.Trigger>
  </AccordionHeader>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Content
    className={cn('dark:text-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]', className)}
    {...props}
    ref={ref}
  >
    <div className='py-[15px]'>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent
}
'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const tooltipVariants = cva([
  [
    'fill-accent',
    'bg-accent',
    'z-50',
    'overflow-hidden',
    'rounded',
    'p-2',
    'text-xs',
    'text-center',
    'text-foreground-inverse',
    'font-semibold'
  ],
  [
    'dark:text-foreground-inverse-dark',
    'dark:bg-accent-dark',
    'dark:fill-accent-dark'
  ]
])
type TooltopP
const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => {
  return (
    <TooltipPrimitive.Arrow
      className={cn('fill-inherit', className)}
      {...props}
      ref={ref}
    />
  )
})

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipVariants(), className)}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

interface SimpleTooltipProps {
  children?: React.ReactNode
  className?: string
  side: TooltipPrimitive.TooltipContentProps['side']
  text: string
}

const SimpleTooltip = ({
  children,
  side,
  text,
  ...props
}: SimpleTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{text}</p>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
  SimpleTooltip
}
export type {

}

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

interface TooltipProps {
  children?: React.ReactNode
  side?: TooltipPrimitive.TooltipContentProps['side']
  content?: React.ReactNode
  sideOffset?: number
  className?: string
}

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipProps
>(({ children, side, content, sideOffset, className }, ref) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side ?? 'top'}
          sideOffset={sideOffset ?? 4}
          className={cn(tooltipVariants(), className)}
          ref={ref}
        >
          {content}
          <TooltipPrimitive.Arrow className={'fill-inherit'} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
})

export { Tooltip }
export type { TooltipProps }

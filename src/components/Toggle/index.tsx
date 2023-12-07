import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import { Label, Switch } from '@/index'

const toggleVariants = cva([
  'flex',
  'justify-between',
  'items-center',
  'gap-2',
  'px-3',
  'py-1',
  'bg-background-subtle',
  'dark:bg-background-subtle-dark',
  'rounded-lg',
  '[&>div]:flex',
  '[&>div]:items-center',
  '[&>div]:gap-2',
  '[&>div]:h-[36px]',
  '[&>svg]:fill-foreground-muted'
])

interface ToggleProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof toggleVariants> {
  label?: string
}

const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>(
  ({ className, label, children, ...props }, ref) => (
    <div className={cn(toggleVariants(), className)} {...props} ref={ref}>
      <div>
        <Switch />
        <Label>{label}</Label>
      </div>
      {children}
    </div>
  )
)

export { Toggle }

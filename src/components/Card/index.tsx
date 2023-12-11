import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Checkbox } from '../Checkbox'
import { Switch } from '../Switch'
import { Label } from '../Label'
import { TrashIcon } from '@/assets/build/trash-outline.icon'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'option' | 'simple' | 'custom' | 'toggle'
  headingText?: string
  description?: string
  selected?: boolean
}

const headerVariants = cva(['flex flex-col space-y-1.5 p-6, font-semibold'], {
  variants: {
    variant: {
      option: ['text-base'],
      simple: ['text-2xl, text-center'],
      custom: ['text-base'],
      toggle: ['text-base']
    }
  }
})

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, selected, headingText, description, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-background border-border p-4',
        className
      )}
      {...props}
    >
      <div className="flex gap-2">
        {variant === 'option' && <Checkbox checked={selected} />}

        <div>
          <div className="flex gap-2">
            {variant === 'toggle' && <Switch />}
            <div className={cn(headerVariants({ variant }))}>{headingText}</div>
          </div>
          {variant !== 'toggle' && <div>{description}</div>}
        </div>
      </div>
    </div>
  )
)
Card.displayName = 'Card'

export { Card, CardProps }

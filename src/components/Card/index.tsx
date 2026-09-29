import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { BsTrash } from '@/assets'
import { Checkbox } from '@/components/Checkbox'
import { IconButton } from '@/components/IconButton'
import { Switch } from '@/components/Switch'
import { cn } from '@/lib/utils'

const selectedClasses = [
  'border-brandGreen-100',
  'outline-1',
  '-outline-offset-2',
  'outline-brandGreen-100',
  'dark:border-brandGreen-100'
]

const checkedClasses = [
  'has-[[data-state=checked]]:border-brandGreen-100',
  'has-[[data-state=checked]]:outline-1',
  'has-[[data-state=checked]]:-outline-offset-2',
  'has-[[data-state=checked]]:outline-brandGreen-100',
  'dark:has-[[data-state=checked]]:border-brandGreen-100'
]

const cardVariants = cva(
  ['rounded-lg', 'border', 'text-foreground', 'dark:text-foreground-dark'],
  {
    variants: {
      variant: {
        outline: [
          'bg-background',
          'border-border',
          'dark:bg-grey-900',
          'dark:border-grey-700'
        ],
        filled: [
          'bg-blue-50',
          'border-transparent',
          'dark:bg-brandMidnight-100'
        ]
      },
      interactive: {
        true: [
          'cursor-pointer',
          'transition-colors',
          'hover:border-border-hover',
          'dark:hover:border-grey-400',
          'focus-visible:outline-hidden',
          'focus-visible:shadow-brandGreen',
          'dark:focus-visible:shadow-brandGreen-10'
        ],
        false: ''
      },
      selected: {
        true: selectedClasses,
        false: ''
      }
    },
    compoundVariants: [
      {
        interactive: true,
        selected: true,
        class: [
          'hover:border-brandGreen-100',
          'dark:hover:border-brandGreen-100'
        ]
      }
    ],
    defaultVariants: {
      variant: 'outline',
      interactive: false,
      selected: false
    }
  }
)

interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, selected, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, interactive, selected }),
        'p-4',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-medium leading-normal', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-xs text-foreground-muted dark:text-foreground-muted-dark',
      className
    )}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

type CheckboxRootProps = React.ComponentPropsWithoutRef<typeof Checkbox>

interface SelectableCardProps extends Omit<
  CheckboxRootProps,
  'title' | 'children' | 'asChild'
> {
  title: React.ReactNode
  description?: React.ReactNode
}

const SelectableCard = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  SelectableCardProps
>(({ className, title, description, id, disabled, ...props }, ref) => {
  const generatedId = React.useId()
  const checkboxId = id ?? generatedId
  const titleId = `${checkboxId}-title`
  const descriptionId = `${checkboxId}-description`

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        cardVariants({ interactive: !disabled }),
        'flex items-start gap-2 px-4 py-3',
        checkedClasses,
        'has-focus-visible:shadow-brandGreen',
        'dark:has-focus-visible:shadow-brandGreen-10',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <Checkbox
        ref={ref}
        id={checkboxId}
        disabled={disabled}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        {...props}
      />
      <span className="flex flex-col gap-0.5">
        <span id={titleId} className="text-sm font-medium leading-normal">
          {title}
        </span>
        {description && (
          <span
            id={descriptionId}
            className="text-xs text-foreground-muted dark:text-foreground-muted-dark"
          >
            {description}
          </span>
        )}
      </span>
    </label>
  )
})
SelectableCard.displayName = 'SelectableCard'

type SwitchRootProps = React.ComponentPropsWithoutRef<typeof Switch>

interface SwitchCardProps extends Omit<
  SwitchRootProps,
  'children' | 'asChild'
> {
  label: React.ReactNode
  onRemove?: () => void
  removeLabel?: string
}

const SwitchCard = React.forwardRef<
  React.ElementRef<typeof Switch>,
  SwitchCardProps
>(
  (
    {
      className,
      label,
      onRemove,
      removeLabel = 'Remove',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const switchId = id ?? generatedId

    return (
      <div
        className={cn(
          cardVariants(),
          'flex items-center gap-2 px-2 py-1',
          checkedClasses,
          disabled && 'opacity-50',
          className
        )}
      >
        <Switch ref={ref} id={switchId} disabled={disabled} {...props} />
        <label
          htmlFor={switchId}
          className={cn(
            'flex-1 text-xs font-medium',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          {label}
        </label>
        {onRemove && (
          <IconButton
            variant="tertiary"
            size="xs"
            label={removeLabel}
            icon={<BsTrash />}
            disabled={disabled}
            onClick={onRemove}
            className="h-7 w-7"
          />
        )}
      </div>
    )
  }
)
SwitchCard.displayName = 'SwitchCard'

export {
  Card,
  CardTitle,
  CardDescription,
  SelectableCard,
  SwitchCard,
  cardVariants,
  type CardProps,
  type SelectableCardProps,
  type SwitchCardProps
}

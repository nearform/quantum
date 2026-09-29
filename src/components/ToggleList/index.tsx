import * as React from 'react'

import { BsTrash } from '@/assets'
import { IconButton } from '@/components/IconButton'
import { Switch } from '@/components/Switch'
import { cn } from '@/lib/utils'

const ToggleList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    role="list"
    className={cn('flex flex-col gap-0.5', className)}
    {...props}
  />
))
ToggleList.displayName = 'ToggleList'

type SwitchRootProps = React.ComponentPropsWithoutRef<typeof Switch>

interface ToggleListItemProps extends Omit<
  SwitchRootProps,
  'children' | 'asChild'
> {
  label: React.ReactNode
  onRemove?: () => void
  removeLabel?: string
}

const ToggleListItem = React.forwardRef<
  React.ElementRef<typeof Switch>,
  ToggleListItemProps
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
      <li
        className={cn(
          'flex min-h-9 items-center gap-2 rounded-md px-2 py-1',
          'bg-background-subtle text-foreground',
          'dark:bg-background-subtle-dark dark:text-foreground-dark',
          disabled && 'opacity-50',
          className
        )}
      >
        <Switch ref={ref} id={switchId} disabled={disabled} {...props} />
        <label
          htmlFor={switchId}
          className={cn(
            'flex-1 text-xs',
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
      </li>
    )
  }
)
ToggleListItem.displayName = 'ToggleListItem'

export { ToggleList, ToggleListItem, type ToggleListItemProps }

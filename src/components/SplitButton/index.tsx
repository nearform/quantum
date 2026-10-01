'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { BsChevronDown } from '@/assets'

const splitButtonVariants = cva(
  [
    'inline-flex',
    'items-stretch',
    'overflow-hidden',
    'rounded-lg',
    'transition-shadow',
    'has-[:focus-visible]:shadow-brandGreen'
  ],
  {
    variants: {
      variant: {
        primary: [],
        secondary: [
          'border',
          'border-border',
          'hover:border-button-secondary-border-hover',
          'has-[:disabled]:border-button-secondary-border-disabled',
          'dark:border-button-secondary-border-dark',
          'dark:hover:border-button-secondary-border-hover-dark',
          'dark:has-[:focus-visible]:shadow-brandGreen10',
          'dark:has-[:disabled]:border-button-secondary-disabled-dark'
        ]
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

const splitButtonSegmentVariants = cva(
  [
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'transition-colors',
    'outline-hidden',
    'cursor-pointer',
    'disabled:cursor-default',
    'disabled:pointer-events-none'
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-button-primary',
          'text-white',
          'hover:bg-button-primary-hover',
          'focus-visible:bg-button-primary-focus',
          'active:bg-button-primary-focus',
          'data-[state=open]:bg-button-primary-focus',
          'disabled:bg-button-primary-disabled',
          'disabled:text-foreground-subtle',
          'dark:bg-button-primary-dark',
          'dark:text-foreground-inverse-dark',
          'dark:hover:bg-button-primary-hover-dark',
          'dark:focus-visible:bg-button-primary-dark',
          'dark:active:bg-button-primary-dark',
          'dark:data-[state=open]:bg-button-primary-dark',
          'dark:disabled:bg-button-primary-disabled-dark',
          'dark:disabled:text-foreground-subtle'
        ],
        secondary: [
          'bg-white',
          'text-grey-900',
          'hover:bg-button-secondary-hover',
          'focus-visible:bg-white',
          'active:bg-button-secondary-focus',
          'data-[state=open]:bg-button-secondary-focus',
          'disabled:bg-button-secondary-disabled',
          'disabled:text-foreground-subtle',
          'dark:bg-button-secondary-dark',
          'dark:text-foreground-dark',
          'dark:hover:bg-button-secondary-hover-dark',
          'dark:focus-visible:bg-button-secondary-dark',
          'dark:active:bg-button-secondary-focus-dark',
          'dark:data-[state=open]:bg-button-secondary-focus-dark',
          'dark:disabled:bg-button-secondary-disabled-dark',
          'dark:disabled:text-foreground-subtle-dark'
        ]
      },
      segment: {
        action: [],
        trigger: [
          'before:absolute',
          'before:left-0',
          'before:inset-y-2',
          'before:w-px',
          'before:bg-current',
          'before:opacity-40'
        ]
      },
      size: {
        md: ['text-sm'],
        sm: ['text-sm']
      }
    },
    compoundVariants: [
      { segment: 'action', size: 'md', class: 'px-4' },
      { segment: 'action', size: 'sm', class: 'px-3' },
      { segment: 'trigger', size: 'md', class: 'px-3' },
      { segment: 'trigger', size: 'sm', class: 'px-2.5' },
      { variant: 'primary', size: 'md', class: 'py-2.5' },
      { variant: 'primary', size: 'sm', class: 'py-2' },
      { variant: 'secondary', size: 'md', class: 'py-[9px]' },
      { variant: 'secondary', size: 'sm', class: 'py-[7px]' }
    ],
    defaultVariants: {
      variant: 'primary',
      segment: 'action',
      size: 'md'
    }
  }
)

const splitButtonMenuVariants = cva([
  'z-50',
  'min-w-40',
  'p-1',
  'rounded-lg',
  'border-2',
  'border-border-subtle',
  'bg-background-surface',
  'text-sm',
  'text-foreground',
  'shadow',
  'outline-hidden',
  'dark:border-border-dark',
  'dark:bg-background-surface-dark',
  'dark:text-foreground-dark'
])

const splitButtonItemVariants = cva([
  'flex',
  'items-center',
  'gap-2',
  'px-3',
  'py-2',
  'rounded-md',
  'cursor-pointer',
  'select-none',
  'outline-hidden',
  'data-[highlighted]:bg-button-tertiary-hover',
  'dark:data-[highlighted]:bg-button-tertiary-hover-dark',
  'data-[disabled]:pointer-events-none',
  'data-[disabled]:text-foreground-subtle',
  'dark:data-[disabled]:text-foreground-subtle-dark'
])

interface SplitButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof splitButtonVariants>,
    Pick<VariantProps<typeof splitButtonSegmentVariants>, 'size'> {
  label: React.ReactNode
  children: React.ReactNode
  menuLabel?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  align?: DropdownMenuPrimitive.DropdownMenuContentProps['align']
  menuClassName?: string
}

const SplitButton = React.forwardRef<HTMLButtonElement, SplitButtonProps>(
  (
    {
      className,
      variant,
      size,
      label,
      children,
      menuLabel = 'More options',
      open,
      defaultOpen,
      onOpenChange,
      align = 'end',
      menuClassName,
      disabled = false,
      type = 'button',
      ...props
    },
    ref
  ) => (
    <DropdownMenuPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={false}
    >
      <div className={cn(splitButtonVariants({ variant }), className)}>
        <button
          ref={ref}
          type={type}
          disabled={disabled}
          className={splitButtonSegmentVariants({
            variant,
            size,
            segment: 'action'
          })}
          {...props}
        >
          {label}
        </button>
        <DropdownMenuPrimitive.Trigger
          disabled={disabled}
          aria-label={menuLabel}
          className={splitButtonSegmentVariants({
            variant,
            size,
            segment: 'trigger'
          })}
        >
          <BsChevronDown aria-hidden="true" className="h-3 w-3" />
        </DropdownMenuPrimitive.Trigger>
      </div>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          sideOffset={4}
          className={cn(splitButtonMenuVariants(), menuClassName)}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
)
SplitButton.displayName = 'SplitButton'

const SplitButtonItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(splitButtonItemVariants(), className)}
    {...props}
  />
))
SplitButtonItem.displayName = 'SplitButtonItem'

const SplitButtonSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(
      '-mx-1 my-1 h-px bg-border-subtle dark:bg-border-dark',
      className
    )}
    {...props}
  />
))
SplitButtonSeparator.displayName = 'SplitButtonSeparator'

export {
  SplitButton,
  SplitButtonItem,
  SplitButtonSeparator,
  splitButtonVariants,
  splitButtonSegmentVariants,
  type SplitButtonProps
}

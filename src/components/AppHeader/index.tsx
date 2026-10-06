import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '../../lib/utils'

const AppHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      'flex items-center justify-between',
      'w-full px-6 py-2',
      'bg-background-surface dark:bg-background-surface-dark',
      'border-b border-border-subtle dark:border-border-subtle-dark',
      'text-foreground dark:text-foreground-dark',
      className
    )}
    {...props}
  />
))
AppHeader.displayName = 'AppHeader'

interface AppHeaderLogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
}

const AppHeaderLogo = React.forwardRef<HTMLAnchorElement, AppHeaderLogoProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center shrink-0',
          'text-foreground dark:text-foreground-dark',
          'focus-visible:outline-hidden',
          'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10',
          'rounded-sm',
          className
        )}
        {...props}
      />
    )
  }
)
AppHeaderLogo.displayName = 'AppHeaderLogo'

const AppHeaderNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn('hidden sm:flex items-center gap-1', className)}
    {...props}
  />
))
AppHeaderNav.displayName = 'AppHeaderNav'

interface AppHeaderLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  active?: boolean
}

const AppHeaderLink = React.forwardRef<HTMLAnchorElement, AppHeaderLinkProps>(
  (
    {
      className,
      asChild = false,
      active = false,
      'aria-current': ariaCurrent,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        ref={ref}
        aria-current={ariaCurrent ?? (active ? 'page' : undefined)}
        className={cn(
          'inline-flex items-center px-3 py-1.5',
          'text-sm font-medium rounded-sm',
          'cursor-pointer',
          'text-foreground-subtle dark:text-foreground-muted-dark',
          'hover:text-foreground dark:hover:text-foreground-dark',
          'aria-[current=page]:text-foreground dark:aria-[current=page]:text-foreground-dark',
          'aria-[current=page]:bg-background dark:aria-[current=page]:bg-background-dark',
          'focus-visible:outline-hidden',
          'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10',
          className
        )}
        {...props}
      />
    )
  }
)
AppHeaderLink.displayName = 'AppHeaderLink'

const AppHeaderActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('hidden sm:flex items-center gap-2', className)}
    {...props}
  />
))
AppHeaderActions.displayName = 'AppHeaderActions'

interface AppHeaderMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean
}

const AppHeaderMenuButton = React.forwardRef<
  HTMLButtonElement,
  AppHeaderMenuButtonProps
>(({ className, open = false, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-expanded={open}
    aria-label={open ? 'Close menu' : 'Open menu'}
    className={cn(
      'inline-flex sm:hidden items-center justify-center',
      'size-8 rounded-sm',
      'cursor-pointer',
      'text-foreground dark:text-foreground-dark',
      'hover:bg-background dark:hover:bg-background-dark',
      'focus-visible:outline-hidden',
      'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10',
      className
    )}
    {...props}
  >
    {children ?? (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        {open ? (
          <path
            d="M4 4L12 12M12 4L4 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M2 4H14M2 8H14M2 12H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        )}
      </svg>
    )}
  </button>
))
AppHeaderMenuButton.displayName = 'AppHeaderMenuButton'

const AppHeaderMobileMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { open?: boolean }
>(({ className, open = false, ...props }, ref) => {
  if (!open) return null
  return (
    <div
      ref={ref}
      className={cn(
        'sm:hidden flex flex-col gap-1',
        'w-full px-6 py-3',
        'bg-background-surface dark:bg-background-surface-dark',
        'border-b border-border-subtle dark:border-border-subtle-dark',
        className
      )}
      {...props}
    />
  )
})
AppHeaderMobileMenu.displayName = 'AppHeaderMobileMenu'

export {
  AppHeader,
  AppHeaderLogo,
  AppHeaderNav,
  AppHeaderLink,
  AppHeaderActions,
  AppHeaderMenuButton,
  AppHeaderMobileMenu,
  type AppHeaderLogoProps,
  type AppHeaderLinkProps,
  type AppHeaderMenuButtonProps
}

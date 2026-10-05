import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

const WebsiteHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      'flex items-center justify-between',
      'w-full px-6 py-3',
      'bg-background dark:bg-background-dark',
      'border-b border-border-subtle dark:border-border-subtle-dark',
      className
    )}
    {...props}
  />
))
WebsiteHeader.displayName = 'WebsiteHeader'

interface WebsiteHeaderLogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
}

const WebsiteHeaderLogo = React.forwardRef<
  HTMLAnchorElement,
  WebsiteHeaderLogoProps
>(({ className, asChild = false, ...props }, ref) => {
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
})
WebsiteHeaderLogo.displayName = 'WebsiteHeaderLogo'

const WebsiteHeaderNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn('hidden sm:flex items-center gap-1', className)}
    {...props}
  />
))
WebsiteHeaderNav.displayName = 'WebsiteHeaderNav'

interface WebsiteHeaderLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  active?: boolean
}

const WebsiteHeaderLink = React.forwardRef<
  HTMLAnchorElement,
  WebsiteHeaderLinkProps
>(
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
          'focus-visible:outline-hidden',
          'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10',
          className
        )}
        {...props}
      />
    )
  }
)
WebsiteHeaderLink.displayName = 'WebsiteHeaderLink'

const WebsiteHeaderActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('hidden sm:flex items-center gap-2', className)}
    {...props}
  />
))
WebsiteHeaderActions.displayName = 'WebsiteHeaderActions'

interface WebsiteHeaderMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean
}

const WebsiteHeaderMenuButton = React.forwardRef<
  HTMLButtonElement,
  WebsiteHeaderMenuButtonProps
>(({ className, open = false, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-expanded={open}
    aria-label={open ? 'Close menu' : 'Open menu'}
    className={cn(
      'inline-flex sm:hidden items-center gap-1',
      'px-3 py-1.5 text-sm font-medium',
      'text-foreground dark:text-foreground-dark',
      'cursor-pointer',
      'focus-visible:outline-hidden',
      'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10',
      'rounded-sm',
      className
    )}
    {...props}
  >
    {children ?? (
      <>
        Menu{' '}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn('transition-transform', open && 'rotate-180')}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </>
    )}
  </button>
))
WebsiteHeaderMenuButton.displayName = 'WebsiteHeaderMenuButton'

const WebsiteHeaderMobileMenu = React.forwardRef<
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
        'bg-background dark:bg-background-dark',
        'border-b border-border-subtle dark:border-border-subtle-dark',
        className
      )}
      {...props}
    />
  )
})
WebsiteHeaderMobileMenu.displayName = 'WebsiteHeaderMobileMenu'

export {
  WebsiteHeader,
  WebsiteHeaderLogo,
  WebsiteHeaderNav,
  WebsiteHeaderLink,
  WebsiteHeaderActions,
  WebsiteHeaderMenuButton,
  WebsiteHeaderMobileMenu,
  type WebsiteHeaderLogoProps,
  type WebsiteHeaderLinkProps,
  type WebsiteHeaderMenuButtonProps
}

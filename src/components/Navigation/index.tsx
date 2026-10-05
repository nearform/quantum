import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

const Navigation = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      'flex items-center gap-1',
      'border-b border-border-subtle',
      'dark:border-border-subtle-dark',
      className
    )}
    {...props}
  />
))
Navigation.displayName = 'Navigation'

interface NavigationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  active?: boolean
}

const NavigationLink = React.forwardRef<HTMLAnchorElement, NavigationLinkProps>(
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
          'inline-flex items-center px-4 py-2',
          'text-sm font-medium',
          '-mb-px border-b-2 border-transparent',
          'cursor-pointer',
          'text-foreground-subtle',
          'hover:text-foreground hover:border-border',
          'aria-[current=page]:text-foreground',
          'aria-[current=page]:border-accent',
          'focus-visible:outline-hidden',
          'focus-visible:shadow-brandGreen',
          'dark:text-foreground-muted-dark',
          'dark:hover:text-foreground-dark dark:hover:border-border-dark',
          'dark:aria-[current=page]:text-foreground-dark',
          'dark:aria-[current=page]:border-accent-dark',
          'dark:focus-visible:shadow-brandGreen10',
          className
        )}
        {...props}
      />
    )
  }
)
NavigationLink.displayName = 'NavigationLink'

export { Navigation, NavigationLink, type NavigationLinkProps }

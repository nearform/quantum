import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'

import { BsChevronRight, type IconType } from '@/assets'
import { cn } from '@/lib/utils'

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ 'aria-label': ariaLabel = 'Breadcrumb', ...props }, ref) => (
  <nav ref={ref} aria-label={ariaLabel} {...props} />
))
Breadcrumb.displayName = 'Breadcrumb'

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.OlHTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-2',
      'text-xs leading-normal',
      'text-foreground-muted dark:text-foreground-muted-dark',
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-2', className)}
    {...props}
  />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  icon?: IconType
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, asChild = false, icon: Icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2',
          'rounded-sm',
          'underline underline-offset-2',
          'cursor-pointer',
          'hover:text-foreground dark:hover:text-foreground-dark',
          'focus-visible:outline-hidden',
          'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10',
          className
        )}
        {...props}
      >
        {Icon ? (
          <Icon
            className="h-3.5 w-3.5 shrink-0 text-foreground dark:text-foreground-dark"
            aria-hidden="true"
          />
        ) : null}
        <Slottable>{children}</Slottable>
      </Comp>
    )
  }
)
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-current="page"
    className={cn(
      'font-semibold text-foreground dark:text-foreground-dark',
      className
    )}
    {...props}
  />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn(
      'inline-flex items-center',
      'text-foreground dark:text-foreground-dark',
      '[&>svg]:h-3 [&>svg]:w-3',
      className
    )}
    {...props}
  >
    {children ?? <BsChevronRight />}
  </li>
))
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  type BreadcrumbLinkProps
}

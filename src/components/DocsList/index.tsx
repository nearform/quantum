'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { BsChevronUp } from '@/assets'
import { cn } from '@/lib/utils'

const linkClasses = [
  'flex w-full items-center rounded-sm px-3 py-1.5',
  'text-sm leading-normal text-left',
  'cursor-pointer',
  'hover:bg-background-alt dark:hover:bg-background-alt-dark',
  'focus-visible:outline-hidden',
  'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10'
]

const DocsList = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      'flex flex-col',
      'bg-background-surface dark:bg-background-surface-dark',
      'text-foreground dark:text-foreground-dark',
      className
    )}
    {...props}
  />
))
DocsList.displayName = 'DocsList'

const DocsListItems = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn('flex flex-col gap-0.5', className)} {...props} />
))
DocsListItems.displayName = 'DocsListItems'

const DocsListItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>((props, ref) => <li ref={ref} {...props} />)
DocsListItem.displayName = 'DocsListItem'

interface DocsListLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  active?: boolean
}

const DocsListLink = React.forwardRef<HTMLAnchorElement, DocsListLinkProps>(
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
          linkClasses,
          'aria-[current=page]:bg-background-alt',
          'dark:aria-[current=page]:bg-background-alt-dark',
          className
        )}
        {...props}
      />
    )
  }
)
DocsListLink.displayName = 'DocsListLink'

interface DocsListGroupContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  contentId: string
}

const DocsListGroupContext =
  React.createContext<DocsListGroupContextValue | null>(null)

function useDocsListGroup(component: string) {
  const context = React.useContext(DocsListGroupContext)
  if (!context) {
    throw new Error(`${component} must be used inside DocsListGroup`)
  }
  return context
}

interface DocsListGroupProps extends React.LiHTMLAttributes<HTMLLIElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const DocsListGroup = React.forwardRef<HTMLLIElement, DocsListGroupProps>(
  (
    { open: openProp, defaultOpen = true, onOpenChange, className, ...props },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const open = openProp ?? uncontrolledOpen
    const contentId = React.useId()

    const setOpen = React.useCallback(
      (next: boolean) => {
        if (openProp === undefined) setUncontrolledOpen(next)
        onOpenChange?.(next)
      },
      [openProp, onOpenChange]
    )

    const value = React.useMemo(
      () => ({ open, setOpen, contentId }),
      [open, setOpen, contentId]
    )

    return (
      <DocsListGroupContext.Provider value={value}>
        <li
          ref={ref}
          data-state={open ? 'open' : 'closed'}
          className={cn('flex flex-col gap-0.5', className)}
          {...props}
        />
      </DocsListGroupContext.Provider>
    )
  }
)
DocsListGroup.displayName = 'DocsListGroup'

const DocsListGroupTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const { open, setOpen, contentId } = useDocsListGroup('DocsListGroupTrigger')
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      className={cn(linkClasses, 'justify-between gap-2', className)}
      onClick={event => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(!open)
      }}
      {...props}
    >
      {children}
      <BsChevronUp
        className={cn(
          'h-3 w-3 shrink-0 transition-transform duration-200',
          !open && 'rotate-180'
        )}
        aria-hidden="true"
      />
    </button>
  )
})
DocsListGroupTrigger.displayName = 'DocsListGroupTrigger'

const DocsListGroupContent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  const { open, contentId } = useDocsListGroup('DocsListGroupContent')
  return (
    <ul
      ref={ref}
      id={contentId}
      hidden={!open}
      className={cn(
        'ml-3 flex flex-col gap-0.5 border-l pl-2',
        'border-border-subtle dark:border-border-subtle-dark',
        className
      )}
      {...props}
    />
  )
})
DocsListGroupContent.displayName = 'DocsListGroupContent'

export {
  DocsList,
  DocsListItems,
  DocsListItem,
  DocsListLink,
  DocsListGroup,
  DocsListGroupTrigger,
  DocsListGroupContent,
  type DocsListLinkProps,
  type DocsListGroupProps
}

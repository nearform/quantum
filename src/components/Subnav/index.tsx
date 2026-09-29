import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

const SubnavContext = React.createContext<
  React.Dispatch<React.SetStateAction<string | undefined>> | undefined
>(undefined)

const Subnav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (
    {
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const [headingId, setHeadingId] = React.useState<string>()
    return (
      <SubnavContext.Provider value={setHeadingId}>
        <nav
          ref={ref}
          aria-label={ariaLabel}
          aria-labelledby={
            ariaLabelledBy ?? (ariaLabel ? undefined : headingId)
          }
          className={cn(
            'flex flex-col gap-4',
            'bg-background dark:bg-background-dark',
            'text-foreground dark:text-foreground-dark',
            className
          )}
          {...props}
        />
      </SubnavContext.Provider>
    )
  }
)
Subnav.displayName = 'Subnav'

interface SubnavHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean
}

const SubnavHeading = React.forwardRef<HTMLHeadingElement, SubnavHeadingProps>(
  ({ className, asChild = false, id, ...props }, ref) => {
    const generatedId = React.useId()
    const headingId = id ?? generatedId
    const setHeadingId = React.useContext(SubnavContext)

    React.useEffect(() => {
      setHeadingId?.(headingId)
      return () => setHeadingId?.(undefined)
    }, [setHeadingId, headingId])

    const Comp = asChild ? Slot : 'h2'
    return (
      <Comp
        ref={ref}
        id={headingId}
        className={cn('text-sm font-semibold leading-normal', className)}
        {...props}
      />
    )
  }
)
SubnavHeading.displayName = 'SubnavHeading'

const SubnavList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-col gap-2 text-xs leading-normal', className)}
    {...props}
  />
))
SubnavList.displayName = 'SubnavList'

const SubnavItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>((props, ref) => <li ref={ref} {...props} />)
SubnavItem.displayName = 'SubnavItem'

interface SubnavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  active?: boolean
}

const SubnavLink = React.forwardRef<HTMLAnchorElement, SubnavLinkProps>(
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
          'inline-flex py-0.5',
          'rounded-sm',
          'cursor-pointer',
          'underline-offset-2 hover:underline',
          'aria-[current=page]:font-semibold',
          'focus-visible:outline-hidden',
          'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10',
          className
        )}
        {...props}
      />
    )
  }
)
SubnavLink.displayName = 'SubnavLink'

export {
  Subnav,
  SubnavHeading,
  SubnavList,
  SubnavItem,
  SubnavLink,
  type SubnavHeadingProps,
  type SubnavLinkProps
}

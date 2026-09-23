import React from 'react'
import { cn } from '@/lib/utils'
import { IconType } from '@/assets'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  selected?: boolean
  icon?: IconType
}

const Link = React.forwardRef<HTMLAnchorElement, Props>(
  (
    {
      className,
      onClick,
      selected = false,
      children,
      icon: Icon,
      'aria-current': ariaCurrent,
      ...props
    },
    ref
  ) => {
    const selectedClasses =
      'cursor-default text-white dark:text-foreground-inverse-dark bg-background-inverse dark:bg-background-inverse-dark'
    const hoverClasses =
      'hover:bg-grey-100 hover:underline dark:hover:bg-grey-700'
    const focusClasses =
      'focus:border-brandBlue-100 focus:ring-[3px] focus:ring-brandBlue-10 focus:underline dark:focus:border-brandBlue-80 dark:focus:ring-0 dark:focus:outline-solid dark:focus:outline-2 dark:focus:outline-offset-2 dark:focus:outline-brandGreen-100'
    const unselectedFocusClasses = 'focus:bg-grey-100 dark:focus:bg-grey-700'

    return (
      <a
        className={cn(
          'flex items-center space-x-3',
          'py-1 px-1.5',
          'rounded',
          'cursor-pointer',
          'outline-hidden',
          'dark:text-white',
          focusClasses,
          selected
            ? selectedClasses
            : `${hoverClasses} ${unselectedFocusClasses}`,
          className
        )}
        ref={ref}
        aria-current={ariaCurrent ?? (selected ? 'page' : undefined)}
        onClick={e => {
          if (selected) {
            e.preventDefault()
          } else {
            onClick && onClick(e)
          }
        }}
        {...props}
      >
        {Icon ? <Icon className="mr-1" aria-hidden="true" /> : null}
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'

export { Link }

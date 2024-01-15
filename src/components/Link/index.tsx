import React from 'react'
import { cn } from '@/lib/utils'
import { IconType } from '@/assets'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  selected?: boolean
  icon?: IconType
}

const Link = React.forwardRef<HTMLAnchorElement, Props>(
  (
    { className, onClick, selected = false, children, icon: Icon, ...props },
    ref
  ) => {
    const selectedClasses =
      'cursor-default text-white dark:text-foreground-inverse-dark bg-background-inverse dark:bg-background-inverse-dark'
    const hoverClasses =
      'hover:bg-grey-100 hover:underline dark:hover:bg-grey-700'
    const focusClasses =
      'focus:shadow-blue focus:underline focus:bg-grey-100 dark:focus:bg-grey-700'

    return (
      <a
        className={cn(
          'flex items-center space-x-3',
          'py-1 px-1.5',
          'rounded',
          'cursor-pointer',
          'outline-none',
          'dark:text-white',
          selected ? selectedClasses : `${hoverClasses} ${focusClasses}`,
          className
        )}
        ref={ref}
        onClick={e => {
          if (selected) {
            e.preventDefault()
          } else {
            onClick && onClick(e)
          }
        }}
        {...props}
      >
        {Icon ? <Icon className="mr-1" /> : null}
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'

export { Link }

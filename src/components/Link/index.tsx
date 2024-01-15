import React from 'react'
import { cn } from '@/lib/utils'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  selected?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, Props>(
  ({ className, onClick, selected = false, ...props }, ref) => {
    const hoverClasses = 'hover:bg-grey-100 hover:underline'
    const focusClasses = 'focus:shadow-blue focus:underline'
    const selectedClasses = 'bg-background-inverse text-white cursor-default'
    const unselectedClasses = hoverClasses + focusClasses

    return (
      <a
        className={cn(
          'py-1 px-1.5',
          'rounded',
          'cursor-pointer',
          'outline-none',
          selected ? selectedClasses : unselectedClasses,
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
      />
    )
  }
)

Link.displayName = 'Link'

export { Link }

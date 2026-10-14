import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { IconType } from '../../assets'

const linkVariants = cva('cursor-pointer outline-hidden', {
  variants: {
    variant: {
      nav: [
        'flex items-center space-x-3',
        'py-1 px-1.5',
        'rounded',
        'dark:text-white',
        'focus:shadow-brandGreen focus:underline dark:focus:shadow-brandGreen10'
      ],
      inline: [
        'inline',
        'rounded-xs',
        'underline underline-offset-2 decoration-1',
        'hover:decoration-2',
        'focus-visible:decoration-2',
        'focus-visible:shadow-brandGreen dark:focus-visible:shadow-brandGreen10'
      ]
    },
    selected: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      variant: 'nav',
      selected: true,
      className:
        'cursor-default text-white dark:text-foreground-inverse-dark bg-background-inverse dark:bg-background-inverse-dark'
    },
    {
      variant: 'nav',
      selected: false,
      className:
        'hover:bg-grey-100 hover:underline dark:hover:bg-grey-700 focus:bg-grey-100 dark:focus:bg-grey-700'
    },
    {
      variant: 'inline',
      selected: true,
      className: 'cursor-default font-semibold no-underline'
    }
  ],
  defaultVariants: {
    variant: 'nav',
    selected: false
  }
})

interface LinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Omit<VariantProps<typeof linkVariants>, 'selected'> {
  selected?: boolean
  icon?: IconType
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      onClick,
      variant,
      selected = false,
      children,
      icon: Icon,
      'aria-current': ariaCurrent,
      ...props
    },
    ref
  ) => {
    const inline = variant === 'inline'

    return (
      <a
        className={cn(linkVariants({ variant, selected }), className)}
        ref={ref}
        aria-current={ariaCurrent ?? (selected ? 'page' : undefined)}
        onClick={e => {
          if (selected) {
            e.preventDefault()
          } else {
            onClick?.(e)
          }
        }}
        {...props}
      >
        {Icon ? (
          <Icon
            className={inline ? 'mr-1 inline-block align-[-0.125em]' : 'mr-1'}
            aria-hidden="true"
          />
        ) : null}
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'

export { Link, linkVariants, type LinkProps }

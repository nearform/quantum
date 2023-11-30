import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const WebsiteFooter = React.forwardRef(() => (
  <div>
    <LinkColumn />
  </div>
))

interface LinkColumnProps extends React.ComponentPropsWithoutRef<'div'> {}

const LinkColumn = React.forwardRef<HTMLDivElement, LinkColumnProps>(
  ({ className, ...props }, ref) => (
    <div className={className} {...props} ref={ref}></div>
  )
)

interface LinkProps extends React.ComponentPropsWithoutRef<'link'> {}

const Link = React.forwardRef<HTMLLinkElement, LinkProps>(({className, ...props}, ref) => (<link className={className} {...props} ref={ref}></link>))

export { WebsiteFooter, LinkColumn, Link }

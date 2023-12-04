import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const websiteFooterVariants = cva(
  ['flex', 'flex-col', 'w-full', 'items-center', 'px-16', 'py-4'],
  {
    variants: {
      size: {
        standard: [],
        sm: [
          '[&>div]:flex-col',
          '[&>div]:items-center',
          '[&>div]:gap-4',
          '[&>div]:[&>div]:items-center'
        ]
      }
    },
    defaultVariants: { size: 'standard' }
  }
)

const footerStatementVariants = cva(
  ['flex', 'flex-col', 'gap-1', 'items-center', 'text-foreground-subtle'],
  {
    variants: {
      size: {
        standard: ['py-8'],
        sm: ['py-4', 'text-sm']
      }
    },
    defaultVariants: { size: 'standard' }
  }
)

const linkRowVariants = cva(['flex', 'w-full', 'justify-between'])

const linkColumnVariants = cva(
  ['flex', 'flex-col', 'px-8', 'dark:text-white'],
  {
    variants: {
      size: {
        lg: [
          'gap-3',
          '[&>div]:font-semibold',
          '[&>div]:mb-2',
          '[&>div]:text-2xl',
          '[&>*]:font-normal',
          '[&>*]:text-md'
        ],
        md: [
          'gap-2',
          '[&>div]:font-semibold',
          '[&>div]:mb-2',
          '[&>div]:text-xl',
          '[&>*]:font-normal',
          '[&>*]:text-sm'
        ],
        sm: [
          'items-center',
          'gap-2',
          '[&>div]:font-semibold',
          '[&>div]:mb-2',
          '[&>div]:text-xl',
          '[&>*]:font-normal',
          '[&>*]:text-sm'
        ]
      }
    },
    defaultVariants: {
      size: 'lg'
    }
  }
)

interface WebsiteFooterProps
  extends React.ComponentPropsWithoutRef<'div'>,
    React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof websiteFooterVariants> {}
{
}

const WebsiteFooter = React.forwardRef<HTMLDivElement, WebsiteFooterProps>(
  ({ className, size, ...props }, ref) => (
    <div
      className={cn(websiteFooterVariants({ size }), className)}
      {...props}
      ref={ref}
    ></div>
  )
)

interface FooterStatementProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof footerStatementVariants> {}

const FooterStatement = React.forwardRef<HTMLDivElement, FooterStatementProps>(
  ({ className, size, ...props }, ref) => (
    <div
      className={cn(footerStatementVariants({ size }), className)}
      {...props}
      ref={ref}
    ></div>
  )
)

interface LinkRowProps extends React.ComponentPropsWithoutRef<'div'> {}

const LinkRow = React.forwardRef<HTMLDivElement, LinkRowProps>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(linkRowVariants(), className)}
      {...props}
      ref={ref}
    ></div>
  )
)

interface LinkColumnProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof linkColumnVariants> {}

const LinkColumn = React.forwardRef<HTMLDivElement, LinkColumnProps>(
  ({ className, size, title, children, ...props }, ref) => (
    <div
      className={cn(linkColumnVariants({ size }), className)}
      {...props}
      ref={ref}
    >
      {title && <div>{title}</div>}
      {children}
    </div>
  )
)

export {
  WebsiteFooter,
  FooterStatement,
  LinkColumn,
  LinkRow,
  type WebsiteFooterProps
}

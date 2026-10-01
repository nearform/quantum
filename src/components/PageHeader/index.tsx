import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

type PageHeaderSize = 'md' | 'sm'

const PageHeaderContext = React.createContext<PageHeaderSize>('md')

const pageHeaderVariants = cva(
  [
    'flex flex-wrap items-center justify-between gap-x-6 gap-y-2',
    'rounded-lg bg-background-surface dark:bg-background-surface-dark',
    'text-foreground dark:text-foreground-dark'
  ],
  {
    variants: {
      size: {
        md: 'min-h-14 px-4 py-2',
        sm: 'min-h-11 px-3 py-1.5'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

interface PageHeaderProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <PageHeaderContext.Provider value={size ?? 'md'}>
      <div
        ref={ref}
        className={cn(pageHeaderVariants({ size }), className)}
        {...props}
      />
    </PageHeaderContext.Provider>
  )
)
PageHeader.displayName = 'PageHeader'

interface PageHeaderTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean
  count?: React.ReactNode
}

const PageHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  PageHeaderTitleProps
>(({ className, asChild = false, count, ...props }, ref) => {
  const size = React.useContext(PageHeaderContext)
  const Comp = asChild ? Slot : 'h1'

  return (
    <div className="flex min-w-0 items-baseline gap-2">
      <Comp
        ref={ref}
        className={cn(
          'min-w-0 font-semibold leading-tight',
          size === 'sm' ? 'text-sm' : 'text-xl',
          className
        )}
        {...props}
      />
      {count !== undefined && count !== null && count !== false && (
        <span className="shrink-0 text-xs text-foreground-muted dark:text-foreground-muted-dark">
          {count}
        </span>
      )}
    </div>
  )
})
PageHeaderTitle.displayName = 'PageHeaderTitle'

const PageHeaderActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'ml-auto flex flex-wrap items-center gap-x-6 gap-y-2',
      className
    )}
    {...props}
  />
))
PageHeaderActions.displayName = 'PageHeaderActions'

export {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
  pageHeaderVariants,
  type PageHeaderProps,
  type PageHeaderTitleProps
}

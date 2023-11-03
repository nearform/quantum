import * as React from 'react'

import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
const tableBodyVariants = cva(['dark:bg-grey-900'], {
  variants: {
    variant: {
      line: [],
      zebra: [
        '[&>*:nth-child(odd)]:bg-purple-50',
        'dark:[&>*:nth-child(odd)]:bg-grey-800'
      ]
    }
  },
  defaultVariants: {
    variant: 'line'
  },
  compoundVariants: [
    {
      variant: 'line'
    }
  ]
})

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('caption-bottom text-sm dark:text-white', className)}
      {...props}
    />
  </div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('bg-grey-50 dark:bg-grey-700', className)}
    {...props}
  />
))
TableHeader.displayName = 'TableHeader'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'px-4 leading-[21px] font-bold [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'
interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableBodyVariants> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, variant, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(tableBodyVariants({ variant }), className)}
      {...props}
    />
  )
)
TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'h-[50px] border-b-[1px] border-accent-alt dark:border-grey-500 self-stretch items-center gap-2 font-normal',
      className
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      ' px-4 py-4 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ',
      className
    )}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4', className)} {...props} />
))
TableCaption.displayName = 'TableCaption'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('bg-primary text-primary-foreground', className)}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
}
export type { TableBodyProps }

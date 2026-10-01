import * as React from 'react'

import { BsArrowDown, BsArrowDownUp, BsArrowUp } from '@/assets'
import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const tableBodyVariants = cva(
  'bg-background-surface dark:bg-background-surface-dark',
  {
    variants: {
      variant: {
        zebra: [
          '[:where(&>*:nth-child(even))]:bg-background-subtle',
          'dark:[:where(&>*:nth-child(even))]:bg-background-subtle-dark'
        ]
      }
    }
  }
)

const alignVariants = cva('', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }
  }
})

type TableAlign = 'left' | 'center' | 'right'

type TableSortDirection = 'asc' | 'desc' | false

const ariaSortFor = (direction: TableSortDirection | undefined) => {
  if (direction === 'asc') return 'ascending'
  if (direction === 'desc') return 'descending'
  return undefined
}

const SortIcon = ({ direction }: { direction?: TableSortDirection }) => {
  if (direction === 'asc') return <BsArrowUp aria-hidden="true" />
  if (direction === 'desc') return <BsArrowDown aria-hidden="true" />
  return <BsArrowDownUp aria-hidden="true" />
}

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  containerClassName?: string
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <div
      tabIndex={0}
      className={cn(
        'relative w-full overflow-auto rounded-2xl',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
        containerClassName
      )}
    >
      <table
        ref={ref}
        className={cn(
          'caption-bottom text-sm text-foreground dark:text-foreground-dark',
          className
        )}
        {...props}
      />
    </div>
  )
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-background-subtle dark:bg-background-subtle-dark text-left',
      className
    )}
    {...props}
  />
))
TableHeader.displayName = 'TableHeader'

interface TableHeadProps extends Omit<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  'align'
> {
  align?: TableAlign
  sortDirection?: TableSortDirection
  onSort?: React.MouseEventHandler<HTMLButtonElement>
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, align, sortDirection, onSort, children, ...props }, ref) => (
    <th
      ref={ref}
      aria-sort={onSort ? ariaSortFor(sortDirection) : undefined}
      className={cn(
        'px-4 py-5 leading-[21px] font-bold',
        alignVariants({ align }),
        className
      )}
      {...props}
    >
      {onSort ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            'inline-flex min-h-6 items-center gap-2 rounded-xs font-bold',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
            '[&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:shrink-0',
            align === 'right' && 'flex-row-reverse'
          )}
        >
          {children}
          <SortIcon direction={sortDirection} />
        </button>
      ) : (
        children
      )}
    </th>
  )
)
TableHead.displayName = 'TableHead'
interface TableBodyProps
  extends
    React.HTMLAttributes<HTMLTableSectionElement>,
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

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => (
    <tr
      ref={ref}
      data-state={selected ? 'selected' : undefined}
      className={cn(
        'h-[50px] self-stretch items-center gap-2 font-normal text-left',
        'data-[state=selected]:bg-background-alt',
        'dark:data-[state=selected]:bg-background-alt-dark',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

interface TableCellProps extends Omit<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  'align'
> {
  align?: TableAlign
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('p-4', alignVariants({ align }), className)}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

interface TableEmptyProps extends TableCellProps {
  colSpan: number
}

const TableEmpty = React.forwardRef<HTMLTableCellElement, TableEmptyProps>(
  ({ className, children = 'No results.', ...props }, ref) => (
    <TableRow>
      <TableCell
        ref={ref}
        align="center"
        className={cn(
          'h-24 text-foreground-muted dark:text-foreground-muted-dark',
          className
        )}
        {...props}
      >
        {children}
      </TableCell>
    </TableRow>
  )
)
TableEmpty.displayName = 'TableEmpty'

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
    className={cn(
      'bg-background-subtle dark:bg-background-subtle-dark font-bold',
      className
    )}
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
  TableCaption,
  TableEmpty
}
export type {
  TableAlign,
  TableBodyProps,
  TableCellProps,
  TableEmptyProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSortDirection
}

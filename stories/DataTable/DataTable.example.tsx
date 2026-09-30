import * as React from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowData,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { BsThreeDots } from '@/assets'
import {
  Avatar,
  Badge,
  Checkbox,
  IconButton,
  Input,
  Pagination,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  type TableAlign
} from '@/components'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: TableAlign
  }
}

type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed'

export type Payment = {
  id: string
  name: string
  email: string
  status: PaymentStatus
  amount: number
}

const names = [
  'Gordon Freeman',
  'Alyx Vance',
  'Isaac Kleiner',
  'Judith Mossman',
  'Wallace Breen',
  'Barney Calhoun',
  'Eli Vance',
  'Arne Magnusson'
]
const statuses: PaymentStatus[] = ['success', 'processing', 'pending', 'failed']

export const payments: Payment[] = Array.from({ length: 23 }, (_, index) => {
  const name = names[index % names.length]
  return {
    id: `pay_${(index + 1).toString().padStart(3, '0')}`,
    name,
    email: `${name.split(' ')[0].toLowerCase()}${index}@example.com`,
    status: statuses[(index * 7) % statuses.length],
    amount: ((index * 3761) % 2000) + 25.5
  }
})

const statusVariant: Record<
  PaymentStatus,
  'success' | 'info' | 'warning' | 'error'
> = {
  success: 'success',
  processing: 'info',
  pending: 'warning',
  failed: 'error'
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows on this page"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select ${row.original.name}`}
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false
  },
  {
    accessorKey: 'name',
    header: 'Customer',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar size="xs" name={row.original.name} aria-hidden="true" />
        <div className="flex flex-col">
          <span className="font-semibold">{row.original.name}</span>
          <span className="text-xs text-foreground-muted dark:text-foreground-muted-dark">
            {row.original.email}
          </span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant={statusVariant[row.original.status]}
        className="capitalize"
      >
        {row.original.status}
      </Badge>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span className="tabular-nums">
        {currency.format(row.original.amount)}
      </span>
    ),
    meta: { align: 'right' }
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger asChild>
          <IconButton
            variant="tertiary"
            size="xs"
            label={`Actions for ${row.original.id}`}
            icon={<BsThreeDots aria-hidden="true" />}
          />
        </PopoverTrigger>
        <PopoverContent align="end" className="min-w-40 p-1">
          <PopoverClose asChild>
            <button
              type="button"
              className="w-full rounded-xs px-3 py-2 text-left hover:bg-background-subtle dark:hover:bg-background-subtle-dark"
              onClick={() => navigator.clipboard?.writeText(row.original.id)}
            >
              Copy payment ID
            </button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    ),
    enableSorting: false
  }
]

export const DataTableDemo = ({
  data = payments,
  pageSize = 5
}: {
  data?: Payment[]
  pageSize?: number
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize
  })

  React.useEffect(() => {
    setPagination({ pageIndex: 0, pageSize })
  }, [pageSize])

  const table = useReactTable({
    data,
    columns,
    getRowId: row => row.id,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: { sorting, columnFilters, rowSelection, pagination }
  })

  const nameColumn = table.getColumn('name')
  const filterValue = (nameColumn?.getFilterValue() as string) ?? ''

  const filterCustomers = (value: string) => {
    nameColumn?.setFilterValue(value)
    table.setPageIndex(0)
  }

  const setCurrentPage: React.Dispatch<React.SetStateAction<number>> = page =>
    table.setPageIndex(index =>
      typeof page === 'function' ? page(index + 1) - 1 : page - 1
    )

  return (
    <div className="flex w-[720px] max-w-full flex-col gap-4">
      <Input
        type="search"
        className="[&::-webkit-search-cancel-button]:appearance-none"
        variant="primary"
        aria-label="Filter customers"
        placeholder="Filter customers..."
        value={filterValue}
        onChange={event => filterCustomers(event.currentTarget.value)}
        onClear={() => filterCustomers('')}
      />
      <Table className="w-full">
        <TableCaption className="sr-only">Recent payments</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  align={header.column.columnDef.meta?.align}
                  sortDirection={header.column.getIsSorted()}
                  onSort={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id} selected={row.getIsSelected()}>
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    align={cell.column.columnDef.meta?.align}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableEmpty colSpan={columns.length} />
          )}
        </TableBody>
      </Table>
      <p
        aria-live="polite"
        className="text-sm text-foreground-muted dark:text-foreground-muted-dark"
      >
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </p>
      {table.getPageCount() > 1 && (
        <Pagination
          currentPage={pagination.pageIndex + 1}
          setCurrentPage={setCurrentPage}
          numberOfItemsPerPage={pagination.pageSize}
          totalNumberOfFilteredItems={table.getFilteredRowModel().rows.length}
        />
      )}
    </div>
  )
}

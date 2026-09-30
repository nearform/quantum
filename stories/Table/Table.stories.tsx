import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import {
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  type TableSortDirection
} from '@/components'

const data = [
  ['Freeman', 'Credit Card', '$250.00'],
  ['Vance', 'Cash', '$50.00'],
  ['Kleiner', 'Credit Card', '$1,400.00'],
  ['Mossman', 'Cash', '$30.00'],
  ['Breen', 'Cash', '$75.50'],
  ['Calhoun', 'Credit Card', '$15,000.00']
]

const meta = {
  title: 'Components/Table',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      options: ['zebra'],
      control: 'check'
    }
  },
  render: props => {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Method</TableHead>
            <TableHead align="right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody variant={props.variant}>
          {data.map(row => (
            <TableRow key={row[0]}>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell align="right">{row[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
} satisfies Meta<typeof TableBody>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Zebra: Story = {
  args: {
    variant: 'zebra'
  }
}

const amountOf = (row: string[]) => Number(row[2].replace(/[$,]/g, ''))

const nextDirection = (direction: TableSortDirection): TableSortDirection =>
  direction === false ? 'asc' : direction === 'asc' ? 'desc' : false

const SortableTable = () => {
  const [sort, setSort] = useState<{
    column: 0 | 2
    direction: TableSortDirection
  }>({ column: 0, direction: false })

  const directionFor = (column: 0 | 2) =>
    sort.column === column ? sort.direction : false
  const toggle = (column: 0 | 2) =>
    setSort({ column, direction: nextDirection(directionFor(column)) })

  const rows = [...data]
  if (sort.direction) {
    rows.sort((a, b) => {
      const order =
        sort.column === 2 ? amountOf(a) - amountOf(b) : a[0].localeCompare(b[0])
      return sort.direction === 'asc' ? order : -order
    })
  }

  return (
    <Table>
      <TableCaption>Invoices, sortable by user and amount.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead sortDirection={directionFor(0)} onSort={() => toggle(0)}>
            User
          </TableHead>
          <TableHead>Method</TableHead>
          <TableHead
            align="right"
            sortDirection={directionFor(2)}
            onSort={() => toggle(2)}
          >
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row[0]}>
            <TableCell>{row[0]}</TableCell>
            <TableCell>{row[1]}</TableCell>
            <TableCell align="right">{row[2]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const Sortable: Story = {
  render: () => <SortableTable />
}

const SelectableTable = ({ variant }: { variant?: 'zebra' | null }) => {
  const [selected, setSelected] = useState<string[]>(['Vance', 'Mossman'])
  const toggle = (user: string, checked: boolean) =>
    setSelected(current =>
      checked ? [...current, user] : current.filter(name => name !== user)
    )
  const allSelected = selected.length === data.length

  return (
    <Table>
      <TableCaption>
        {selected.length} of {data.length} invoices selected.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="Select all invoices"
              checked={allSelected || (selected.length > 0 && 'indeterminate')}
              onCheckedChange={checked =>
                setSelected(checked === true ? data.map(row => row[0]) : [])
              }
            />
          </TableHead>
          <TableHead>User</TableHead>
          <TableHead>Method</TableHead>
          <TableHead align="right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody variant={variant}>
        {data.map(row => (
          <TableRow key={row[0]} selected={selected.includes(row[0])}>
            <TableCell>
              <Checkbox
                aria-label={`Select ${row[0]}`}
                checked={selected.includes(row[0])}
                onCheckedChange={checked => toggle(row[0], checked === true)}
              />
            </TableCell>
            <TableCell>{row[0]}</TableCell>
            <TableCell>{row[1]}</TableCell>
            <TableCell align="right">{row[2]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const SelectedRows: Story = {
  render: props => <SelectableTable variant={props.variant} />
}

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Method</TableHead>
          <TableHead align="right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty colSpan={3}>No invoices yet.</TableEmpty>
      </TableBody>
    </Table>
  )
}

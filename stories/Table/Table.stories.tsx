import type { Meta, StoryObj } from '@storybook/react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components'

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
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody variant={props.variant}>
          <TableRow>
            <TableCell>Freeman</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vance</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell className="text-right">$50.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kleiner</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$1400.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mossman</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell className="text-right">$30.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Breen</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell className="text-right">$75.50</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Calhoun</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$400.00</TableCell>
          </TableRow>
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

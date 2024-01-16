import type { Meta, StoryObj } from '@storybook/react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Label,
  Checkbox
} from '@/components'

import { BsPersonCircle } from '@/assets'

const meta = {
  title: 'Components/Table',
  parameters: {
    layout: 'centered'
  },
  render: props => {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header Cell</TableHead>
            <TableHead>
              <div className="flex items-center">
                <BsPersonCircle className="mr-2" /> User
              </div>
            </TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody variant={props.variant}>
          <TableRow>
            <TableCell>Data Cell</TableCell>
            <TableCell>Freeman</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="space-x-2">
              <Checkbox />
              <Label>Insert a checkbox</Label>
            </TableCell>
            <TableCell>Vance</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data Cell</TableCell>
            <TableCell>Kleiner</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data Cell</TableCell>
            <TableCell>Mossman</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data Cell</TableCell>
            <TableCell>Breen</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data Cell</TableCell>
            <TableCell>Calhoun</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
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

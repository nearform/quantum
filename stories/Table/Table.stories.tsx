import type { Meta, StoryObj } from '@storybook/react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components';

const data = [
  ['Freeman', 'Credit Card', '$250.00'],
  ['Vance', 'Cash', '$50.00'],
  ['Kleiner', 'Credit Card', '$1,400.00'],
  ['Mossman', 'Cash', '$30.00'],
  ['Breen', 'Cash', '$75.50'],
  ['Calhoun', 'Credit Card', '$15,000.00']
];

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
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody variant={props.variant}>
          {data.map(row => (
            <TableRow>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell className="text-right">{row[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
} satisfies Meta<typeof TableBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Zebra: Story = {
  args: {
    variant: 'zebra'
  }
};

import type { Meta, StoryObj } from '@storybook/react-vite'

import { DataTableDemo } from './DataTable.example'

const meta = {
  title: 'Components/Data Table',
  component: DataTableDemo,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    data: { control: false },
    pageSize: { control: { type: 'number', min: 1, max: 25 } }
  }
} satisfies Meta<typeof DataTableDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
  args: {
    data: []
  }
}

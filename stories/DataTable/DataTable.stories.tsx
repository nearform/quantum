import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

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

export const FilteredByCustomer: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText('Filter customers'), 'alyx')

    const bodyRows = within(canvas.getByRole('table'))
      .getAllByRole('row')
      .slice(1)
    await expect(bodyRows).toHaveLength(3)
    for (const row of bodyRows) {
      await expect(row).toHaveTextContent('Alyx Vance')
    }
  }
}

export const Empty: Story = {
  args: {
    data: []
  }
}

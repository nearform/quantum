import type { Meta, StoryObj } from '@storybook/react'

import { FolderIcon, Toggle } from '@/index'

const meta = {
  title: 'Form/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Some Label Text',
    children: <FolderIcon />,
    className: 'w-96'
  }
}

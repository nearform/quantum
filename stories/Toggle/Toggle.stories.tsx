import type { Meta, StoryObj } from '@storybook/react'

import { TrashIcon, Toggle } from '@/index'

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
    children: <TrashIcon className="h-[36px] w-[36px]" />,
    className: 'w-96'
  }
}

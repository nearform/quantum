import type { Meta, StoryObj } from '@storybook/react-vite'

import { BackLink } from '@/index'

const meta = {
  title: 'Components/BackLink',
  component: BackLink,
  parameters: {
    layout: 'centered'
  },
  args: {
    href: '#',
    children: 'Back'
  },
  argTypes: {
    onClick: {
      action: 'clicked'
    },
    size: {
      options: ['md', 'sm'],
      control: { type: 'radio' }
    },
    children: { control: 'text' }
  }
} satisfies Meta<typeof BackLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: {
    size: 'sm'
  }
}

export const CustomLabel: Story = {
  args: {
    children: 'Back to results'
  }
}

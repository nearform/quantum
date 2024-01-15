import type { Meta, StoryObj } from '@storybook/react'

import { Link } from '@/index'

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: 'Link',
    target: '_blank'
  },
  argTypes: { onClick: { action: 'clicked' } }
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: 'http://www.example.com/1'
  }
}

export const Selected: Story = {
  args: {
    selected: true,
    href: 'http://www.example.com/2'
  }
}

export const WithIcon: Story = {}

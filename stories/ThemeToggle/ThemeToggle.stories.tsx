import type { Meta, StoryObj } from '@storybook/react-vite'

import { ThemeToggle } from '@/index'

const meta = {
  title: 'Utility/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary']
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg']
    },
    shape: {
      control: 'inline-radio',
      options: ['rounded', 'circle']
    }
  }
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Circle: Story = {
  args: {
    shape: 'circle'
  }
}

export const Sizes: Story = {
  render: props => (
    <div className="flex items-center gap-2">
      <ThemeToggle {...props} size="xs" />
      <ThemeToggle {...props} size="sm" />
      <ThemeToggle {...props} size="md" />
      <ThemeToggle {...props} size="lg" />
    </div>
  )
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { TabsDemo, TabsStates } from './Tabs.example'

const meta = {
  title: 'Components/Tabs',
  component: TabsDemo,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: 'inline-radio'
    },
    size: {
      options: ['md', 'sm'],
      control: 'inline-radio'
    },
    activationMode: {
      options: ['automatic', 'manual'],
      control: 'inline-radio'
    },
    withCount: { control: 'boolean' },
    withIcons: { control: 'boolean' },
    withDisabled: { control: 'boolean' }
  }
} satisfies Meta<typeof TabsDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal'
  }
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical'
  }
}

export const Small: Story = {
  args: {
    size: 'sm'
  }
}

export const WithCount: Story = {
  args: {
    withCount: true
  }
}

export const WithIcons: Story = {
  args: {
    withIcons: true
  }
}

export const Disabled: Story = {
  args: {
    withDisabled: true
  }
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TabsStates size="md" />
      <TabsStates size="sm" />
    </div>
  )
}

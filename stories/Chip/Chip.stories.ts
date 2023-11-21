import type { Meta, StoryObj } from '@storybook/react'

import { Chip } from '@/index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl '],
      control: 'radio'
    }
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {}

export const Warning: Story = {
  args: {
    variant: 'warning'
  }
}
export const Error: Story = {
  args: {
    variant: 'error'
  }
}
export const Info: Story = {
  args: {
    variant: 'info'
  }
}
export const Success: Story = {
  args: {
    variant: 'success'
  }
}
export const Active: Story = {
  args: {
    variant: 'active'
  }
}
export const Disabled: Story = {
  args: {
    disabled: true
  }
}

//todo sizes

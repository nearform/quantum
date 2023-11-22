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
export const Default: Story = {
  args: {
    children: 'Hello, this is a chip'
  }
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Hello, this is a chip'
  }
}
export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Hello, this is a chip'
  }
}
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Hello, this is a chip'
  }
}
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Hello, this is a chip'
  }
}
export const Active: Story = {
  args: {
    variant: 'active',
    children: 'Hello, this is a chip'
  }
}
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Hello, this is a chip'
  }
}

export const LargeDefault: Story = {
  args: {
    size: 'lg',
    children: 'Hello, this is a chip'
  }
}
export const LargeActive: Story = {
  args: {
    variant: 'active',
    size: 'lg',
    children: 'Hello, this is a chip'
  }
}

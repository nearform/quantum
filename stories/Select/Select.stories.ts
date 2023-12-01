import type { Meta, StoryObj } from '@storybook/react'

import { SelectDemo } from './Select.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Select',
  component: SelectDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  }
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof SelectDemo>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    example: 'small'
  }
}
export const Success: Story = {
  args: {
    example: 'small',
    variant: 'success'
  }
}

export const Error: Story = {
  args: {
    example: 'small',
    variant: 'error'
  }
}
export const Long: Story = {
  args: {
    example: 'long'
  }
}

export const ItemAligned: Story = {
  args: {
    example: 'item-aligned'
  }
}

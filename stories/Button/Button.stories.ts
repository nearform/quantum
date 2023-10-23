import type { Meta, StoryObj } from '@storybook/react'

import { TestButton } from './Button.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Button',
  component: TestButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof TestButton>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'default',
    text: 'hello world'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  }
}

export const Large: Story = {
  args: {
    variant: 'destructive'
  }
}

export const Small: Story = {
  args: {
    variant: 'outline'
  }
}

export const Warning: Story = {
  args: {
    variant: 'ghost'
  }
}

export const Red: Story = {
  args: {
    variant: 'red'
  }
}

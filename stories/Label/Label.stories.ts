import type { Meta, StoryObj } from '@storybook/react'

import { LabelDemo } from './Label.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Label',
  component: LabelDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl '],
      control: 'radio'
    }
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof LabelDemo>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    labelText: 'Here is a default label'
  }
}
export const Small: Story = {
  args: {
    labelText: 'Here is a small label',
    size: 'sm'
  }
}
export const LargeText: Story = {
  args: {
    labelText: 'Here is a large sized label',
    size: 'lg'
  }
}
export const ExtraLarge: Story = {
  args: {
    labelText: 'Here is an extra large label',
    size: 'xl'
  }
}

import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerDemo } from './DatePicker.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/DatePicker',
  component: DatePickerDemo,
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
} satisfies Meta<typeof DatePickerDemo>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    labelText: 'Default-sized'
  }
}
export const Medium: Story = {
  args: {
    labelText: 'Medium-sized',
    size: 'md'
  }
}
export const Large: Story = {
  args: {
    labelText: 'Large-sized',
    size: 'lg'
  }
}
export const ExtraLarge: Story = {
  args: {
    labelText: 'Extra-large-sized',
    size: 'xl'
  }
}

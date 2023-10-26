import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroupDemo } from './Radio.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroupDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof RadioGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NoDefault: Story = {}
export const DefaultSet: Story = {
  args: {
    defaultValue: 'goodbye'
  }
}
export const HorizontallyOrientated: Story = {
  args: {
    defaultValue: 'hello',
    orientation: 'horizontal'
  }
}

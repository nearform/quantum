import type { Meta, StoryObj } from '@storybook/react'

import { StepIndicatorDemo } from './StepsIndicator.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Steps Indicator',
  component: StepIndicatorDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  tags: ['autodocs']
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof StepIndicatorDemo>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    stepNumber: 10,
    selectedIndex: 5
  }
}
export const Medium: Story = {
  args: {
    stepNumber: 1,
    selectedIndex: 0
  }
}
export const Large: Story = {
  args: {}
}
export const ExtraLarge: Story = {
  args: {}
}

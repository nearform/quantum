import type { Meta, StoryObj } from '@storybook/react'

import { StepsIndicator } from '@/components/StepsIndicator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Steps Indicator',
  component: StepsIndicator,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  tags: ['autodocs']
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof StepsIndicator>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    length: 10,
    selectedIndex: 5
  }
}
export const Customised: Story = {
  args: {
    length: 5,
    selectedIndex: 3,
    className: 'border border-4 p-5',
    childClassName:
      'data-[selected=true]:text-red-600 data-[selected=true]:h-5 data-[selected=true]:w-5'
  }
}

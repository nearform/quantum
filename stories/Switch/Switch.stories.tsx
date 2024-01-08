import type { Meta, StoryObj } from '@storybook/react'

import { Switch, Label } from '@/index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Switch',
  component: Switch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  }
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const WithLabel: Story = {
  render: props => (
    <div className="flex space-x-1">
      <Switch id="switchId1" {...props} />
      <Label htmlFor="switchId1" hintText="This is a hint">
        Label
      </Label>
    </div>
  )
}

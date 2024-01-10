import type { Meta, StoryObj } from '@storybook/react'

import { Switch, ControlLabel, Checkbox } from '@/index'

const meta = {
  title: 'Form/ControlLabel',
  component: ControlLabel,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof ControlLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label'
  },
  render: props => (
    <ControlLabel htmlFor="fieldId" {...props}>
      <Switch id="fieldId" value="value" />
    </ControlLabel>
  )
}

export const WithHintText: Story = {
  args: {
    label: 'Label',
    hintText: 'This is a hint'
  },
  render: props => (
    <ControlLabel htmlFor="fieldId" {...props}>
      <Checkbox id="fieldId" value="value" />
    </ControlLabel>
  )
}

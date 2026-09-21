import type { Meta, StoryObj } from '@storybook/react-vite'

import { Switch, ControlLabel } from '@/index'

const meta = {
  title: 'Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Standalone in the canvas, so it carries its own name; the stories below
    // show the pattern to reach for in a real form.
    'aria-label': 'Example switch'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Example switch'
  }
}

export const WithLabel: Story = {
  render: props => (
    <ControlLabel htmlFor="withLabelId" label="Label">
      <Switch id="withLabelId" {...props} />
    </ControlLabel>
  )
}

export const WithLabelAndHint: Story = {
  render: props => (
    <ControlLabel htmlFor="withHintId" label="Label" hintText="This is a hint">
      <Switch id="withHintId" {...props} />
    </ControlLabel>
  )
}

export const WithLabelOnTheLeft: Story = {
  render: props => (
    <ControlLabel
      htmlFor="withLabelOnTheLeftId"
      label="Label"
      hintText="This is a hint"
      position="left"
    >
      <Switch id="withLabelOnTheLeftId" {...props} />
    </ControlLabel>
  )
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox, ControlLabel } from '@/index'

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    checked: {
      options: [true, false, 'indeterminate'],
      control: { type: 'radio' }
    },
    className: {
      controle: 'text',
      description: 'Alter the className to change the style'
    }
  }
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: {
    checked: false,
    'aria-label': 'Example checkbox'
  }
}
export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': 'Example checkbox'
  }
}
export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
    'aria-label': 'Example checkbox'
  }
}

export const ColourChange: Story = {
  args: {
    checked: true,
    'aria-label': 'Example checkbox',
    className:
      'data-[state=checked]:text-yellow-200 data-[state=checked]:bg-green-900 data-[state=checked]:border-border'
  }
}

export const WithLabel: Story = {
  render: props => (
    <ControlLabel htmlFor="withLabelId" label="Label">
      <Checkbox id="withLabelId" {...props} />
    </ControlLabel>
  )
}

export const WithLabelAndHint: Story = {
  render: props => (
    <ControlLabel htmlFor="withHintId" label="Label" hintText="This is a hint">
      <Checkbox id="withHintId" {...props} />
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
      <Checkbox id="withLabelOnTheLeftId" {...props} />
    </ControlLabel>
  )
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider, ControlLabel } from '@/index'

const meta = {
  title: 'Form/Slider',
  component: Slider,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    Story => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    'aria-label': 'Example slider'
  }
}

export const WithEndLabels: Story = {
  args: {
    defaultValue: [50],
    minLabel: '0',
    maxLabel: '100',
    'aria-label': 'Slider with end labels'
  }
}

export const WithRange: Story = {
  args: {
    defaultValue: [25, 75],
    minLabel: '0',
    maxLabel: '100',
    'aria-label': 'Range slider'
  }
}

export const WithSteps: Story = {
  args: {
    defaultValue: [50],
    step: 10,
    minLabel: '0',
    maxLabel: '100',
    'aria-label': 'Stepped slider'
  }
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
    minLabel: '0',
    maxLabel: '100',
    'aria-label': 'Disabled slider'
  }
}

export const WithLabel: Story = {
  render: props => (
    <ControlLabel label="Volume">
      <Slider
        aria-label="Volume"
        defaultValue={[50]}
        minLabel="0"
        maxLabel="100"
        {...props}
      />
    </ControlLabel>
  )
}

export const WithLabelAndHint: Story = {
  render: props => (
    <ControlLabel label="Brightness" hintText="Adjust screen brightness">
      <Slider
        aria-label="Brightness"
        defaultValue={[70]}
        minLabel="0%"
        maxLabel="100%"
        {...props}
      />
    </ControlLabel>
  )
}

export const CustomEndLabels: Story = {
  args: {
    defaultValue: [3],
    min: 1,
    max: 10,
    minLabel: 'Low',
    maxLabel: 'High',
    'aria-label': 'Priority'
  }
}

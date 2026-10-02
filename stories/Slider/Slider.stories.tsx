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

export const WithRange: Story = {
  args: {
    defaultValue: [25, 75],
    'aria-label': 'Range slider'
  }
}

export const WithSteps: Story = {
  args: {
    defaultValue: [50],
    step: 10,
    'aria-label': 'Stepped slider'
  }
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
    'aria-label': 'Disabled slider'
  }
}

export const WithLabel: Story = {
  render: props => (
    <ControlLabel label="Volume">
      <Slider aria-label="Volume" defaultValue={[50]} {...props} />
    </ControlLabel>
  )
}

export const WithLabelAndHint: Story = {
  render: props => (
    <ControlLabel label="Brightness" hintText="Adjust screen brightness">
      <Slider aria-label="Brightness" defaultValue={[70]} {...props} />
    </ControlLabel>
  )
}

export const MinMax: Story = {
  args: {
    defaultValue: [20],
    min: 0,
    max: 100,
    'aria-label': 'Min max slider'
  },
  render: props => (
    <div className="flex flex-col gap-2">
      <Slider {...props} />
      <div className="flex justify-between text-sm text-foreground-subtle dark:text-foreground-subtle-dark">
        <span>{props.min ?? 0}</span>
        <span>{props.max ?? 100}</span>
      </div>
    </div>
  )
}

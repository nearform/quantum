import type { Meta, StoryObj } from '@storybook/react-vite'

import { ControlLabel, Radio, RadioGroup } from '@/index'

const items = [
  { value: 'hello', label: 'Hello' },
  { value: 'world', label: 'World' },
  { value: 'goodbye', label: 'Goodbye' },
  { value: 'friend', label: 'Friend' }
]

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  render: props => (
    <RadioGroup {...props}>
      {items.map(({ value, label }) => (
        <Radio key={value} value={value} label={label} />
      ))}
    </RadioGroup>
  ),
  parameters: {
    layout: 'centered'
  },
  args: {
    legend: 'Pick a greeting'
  },
  argTypes: {
    orientation: {
      options: ['vertical', 'horizontal'],
      control: 'inline-radio'
    },
    labelPosition: {
      options: ['left', 'right'],
      control: 'inline-radio'
    },
    legend: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    className: {
      table: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const NoDefault: Story = {}

export const DefaultSet: Story = {
  args: {
    defaultValue: 'goodbye'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'hello'
  }
}

/**
 * A hint on a single option is announced with the radio it belongs to. When
 * the hint is the difference between two choices -- which is what a radio
 * group is for -- a reader who only hears the labels has not been told what
 * they are choosing between.
 */
export const WithOptionHints: Story = {
  args: {
    legend: 'Delivery',
    description: 'Charged when the order is dispatched',
    defaultValue: 'standard'
  },
  render: props => (
    <RadioGroup {...props} className="w-80">
      <Radio
        value="standard"
        label="Standard"
        description="Three to five working days, free"
      />
      <Radio
        value="express"
        label="Express"
        description="Next working day, £4.95"
      />
      <Radio
        value="collect"
        label="Click and collect"
        description="Ready in two hours at your chosen shop"
      />
    </RadioGroup>
  )
}

/**
 * `orientation` lays the options out and sets which arrow keys move between
 * them. A horizontal group is navigated with the left and right arrows, a
 * vertical one with up and down.
 */
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    defaultValue: 'world'
  }
}

/**
 * `error` says what is wrong under the options and marks the group invalid,
 * which is what draws the red border on each radio. The message is published
 * to the group rather than to the controls, so it is announced once when focus
 * enters the group rather than on every option.
 */
export const WithAnError: Story = {
  args: {
    legend: 'Pick a greeting',
    error: 'Choose one to continue'
  }
}

/**
 * `labelPosition="left"` moves every label to the other side of its control
 * and right-aligns the column, so the controls still line up.
 */
export const LabelsOnTheLeft: Story = {
  args: {
    defaultValue: 'hello',
    labelPosition: 'left'
  }
}

/**
 * A `Radio` with no `label` of its own is the bare control it has always been,
 * so an existing `ControlLabel` pairing keeps working. Prefer the `label`
 * prop for anything new: `ControlLabel` cannot wire up a per-option hint, and
 * a hint nothing points at is not announced.
 */
export const WithControlLabel: Story = {
  args: {
    legend: undefined,
    'aria-label': 'Pick a greeting'
  },
  render: props => (
    <RadioGroup {...props}>
      {items.map(({ value, label }) => (
        <ControlLabel
          key={value}
          htmlFor={`control-label-${value}`}
          label={label}
        >
          <Radio id={`control-label-${value}`} value={value} />
        </ControlLabel>
      ))}
    </RadioGroup>
  )
}

import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { CheckboxGroup, CheckboxGroupItem } from '@/index'

const CONTACT = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'post', label: 'Post' }
]

const meta = {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered'
  },
  args: {
    legend: 'How should we contact you?',
    name: 'contact'
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
    description: { control: 'text' },
    error: { control: 'text' },
    legend: { control: 'text' },
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false }
  },
  render: props => (
    <CheckboxGroup {...props}>
      {CONTACT.map(({ value, label }) => (
        <CheckboxGroupItem key={value} value={value} label={label} />
      ))}
    </CheckboxGroup>
  )
} satisfies Meta<typeof CheckboxGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description: 'Select all that apply',
    defaultValue: ['email']
  }
}

/**
 * A group with no legend is a group with no name. It is the right shape only
 * when something else on the page already names the set -- a heading directly
 * above it, say -- and that something has to be reachable, so a group whose
 * name lives elsewhere takes an `aria-labelledby` pointing at it.
 */
export const WithoutALegend: Story = {
  args: {
    legend: undefined,
    'aria-label': 'How should we contact you?'
  }
}

/**
 * A hint on a single option is announced with the box it belongs to, rather
 * than being left as text that happens to sit nearby. When the hint is the
 * difference between two choices, a reader who only hears the labels has not
 * been told what they are choosing between.
 */
export const WithOptionHints: Story = {
  args: {
    legend: 'Delivery updates',
    defaultValue: ['email']
  },
  render: props => (
    <CheckboxGroup {...props} className="w-80">
      <CheckboxGroupItem
        value="email"
        label="Email"
        description="One message when the parcel is dispatched"
      />
      <CheckboxGroupItem
        value="sms"
        label="Text message"
        description="Hourly on the day of delivery"
      />
      <CheckboxGroupItem
        value="push"
        label="Push notification"
        description="Requires the mobile app"
      />
    </CheckboxGroup>
  )
}

/**
 * Horizontal wraps rather than overflowing, so a group that outgrows its
 * container becomes two rows instead of a scrollbar.
 */
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    description: 'Select all that apply'
  }
}

/**
 * `labelPosition="left"` moves every label to the other side of its control
 * and right-aligns the column, so the controls still line up.
 */
export const LabelsOnTheLeft: Story = {
  args: {
    labelPosition: 'left',
    defaultValue: ['phone']
  }
}

/**
 * `error` says what is wrong under the options and marks every box in the
 * group invalid, which is what draws the red border. The group's own
 * `aria-describedby` is what gets the message announced, and a fieldset's
 * description is read when focus first enters the group -- so it is heard
 * once, before the options, rather than five times.
 */
export const WithAnError: Story = {
  args: {
    description: 'Select all that apply',
    error: 'Choose at least one way for us to reach you'
  }
}

/**
 * A whole group, and a single option inside an otherwise live one.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: ['email']
  },
  render: props => (
    <div className="flex flex-col gap-8">
      <CheckboxGroup {...props}>
        {CONTACT.map(({ value, label }) => (
          <CheckboxGroupItem key={value} value={value} label={label} />
        ))}
      </CheckboxGroup>
      <CheckboxGroup
        legend="Newsletters"
        disabled={false}
        defaultValue={['product']}
      >
        <CheckboxGroupItem value="product" label="Product updates" />
        <CheckboxGroupItem
          value="beta"
          label="Beta programme"
          description="Not available on your plan"
          disabled
        />
      </CheckboxGroup>
    </div>
  )
}

/**
 * The group owns the selection, so a controlled group is one `value` and one
 * `onValueChange` rather than a boolean per box.
 */
export const Controlled: Story = {
  args: {
    description: 'Select all that apply'
  },
  render: function Controlled(props) {
    const [value, setValue] = React.useState<string[]>(['email'])

    return (
      <div className="flex flex-col gap-3">
        <CheckboxGroup {...props} value={value} onValueChange={setValue}>
          {CONTACT.map(({ value: itemValue, label }) => (
            <CheckboxGroupItem
              key={itemValue}
              value={itemValue}
              label={label}
            />
          ))}
        </CheckboxGroup>
        <p className="text-xs text-foreground-muted dark:text-foreground-muted-dark">
          Selected:{' '}
          <span data-testid="selection">{value.join(', ') || 'none'}</span>
        </p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selection = canvas.getByTestId('selection')

    await userEvent.click(canvas.getByLabelText('Phone'))
    await expect(selection).toHaveTextContent('email, phone')

    await userEvent.click(canvas.getByLabelText('Email'))
    await expect(selection).toHaveTextContent('phone')

    await userEvent.click(canvas.getByLabelText('Phone'))
    await expect(selection).toHaveTextContent('none')
  }
}

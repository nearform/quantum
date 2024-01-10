import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxDemo } from './CheckBox.example'

const meta = {
  title: 'Form/Checkbox',
  component: CheckboxDemo,
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
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: {
    checked: false
  }
}
export const Checked: Story = {
  args: {
    checked: true
  }
}
export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate'
  }
}

export const ColourChange: Story = {
  args: {
    checked: true,
    className:
      'data-[state=checked]:text-yellow-200 data-[state=checked]:bg-green-900 data-[state=checked]:border-border'
  }
}

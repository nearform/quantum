import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroupDemo } from './Radio.example'

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroupDemo,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof RadioGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

const parameters = {
  controls: { exclude: ['id'] }
}

export const NoDefault: Story = {
  args: {
    id: 'no-default'
  },
  parameters
}
export const DefaultSet: Story = {
  args: {
    defaultValue: 'goodbye',
    id: 'default'
  },
  parameters
}
export const RadioButtonDisabled: Story = {
  args: {
    disabled: true,
    id: 'disabled'
  },
  parameters
}

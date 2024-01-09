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

export const NoDefault: Story = {}
export const DefaultSet: Story = {
  args: {
    defaultValue: 'goodbye'
  }
}
export const RadioButtonDisabled: Story = {
  args: {
    disabled: true
  }
}
export const RadioButtonHorizontalOrientation: Story = {
  args: {
    orientation: 'horizontal'
  }
}

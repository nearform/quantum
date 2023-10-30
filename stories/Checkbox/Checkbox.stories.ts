import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxDemo } from './CheckBox.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Checkbox',
  component: CheckboxDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
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
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CheckBoxUnchecked: Story = {
  args: {
    checked: false
  }
}
export const CheckBoxChecked: Story = {
  args: {
    checked: true
  }
}
export const CheckBoxIndeterminate: Story = {
  args: {
    checked: 'indeterminate'
  }
}

export const CheckboxColourChange: Story = {
  args: {
    checked: true,
    className:
      'data-[state=checked]:text-yellow-200 data-[state=checked]:bg-grey-900 data-[state=checked]:border-grey-900'
  }
}

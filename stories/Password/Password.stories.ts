import type { Meta, StoryObj } from '@storybook/react'

import { PasswordDemo as Password } from './Password.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Password',
  component: Password,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  argTypes: {
    disabled: {
      options: [true, false, 'indeterminate'],
      control: { type: 'radio' }
    },
    className: {
      controle: 'text',
      description: 'Alter the className to change the style'
    }
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Password>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PasswordDefault: Story = {
  args: {}
}

export const WithoutToggleMask: Story = {
  args: {
    value: 'secret',
    toggleMask: false
  }
}

export const Disabled: Story = {
  args: {
    value: 'secret',
    disabled: true
  }
}

export const Error: Story = {
  args: {
    variant: 'error'
  }
}

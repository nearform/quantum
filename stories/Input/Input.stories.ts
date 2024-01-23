import type { Meta, StoryObj } from '@storybook/react'

import { InputDemo as Input } from './Input.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  argTypes: {
    checked: {
      options: [true, false, 'indeterminate'],
      control: { type: 'radio' }
    },
    size: {
      options: ['sm', 'md'],
      controls: { type: 'radio' }
    },
    className: {
      controle: 'text',
      description: 'Alter the className to change the style'
    }
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PrimaryInput: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    type: 'text'
  }
}
export const ErrorInput: Story = {
  args: {
    size: 'md',
    variant: 'error',
    type: 'text'
  }
}

export const SuccessInput: Story = {
  args: {
    size: 'md',
    variant: 'success',
    type: 'text'
  }
}
export const SmallInput: Story = {
  args: {
    size: 'sm',
    variant: 'primary',
    type: 'text'
  }
}
export const Disabled: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    type: 'text',
    disabled: true
  }
}
export const Search: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    type: 'search'
  }
}

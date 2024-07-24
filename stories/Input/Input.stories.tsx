import type { Meta, StoryObj } from '@storybook/react'

import { InputDemo as Input } from './Input.example'
import { BsPersonFill } from 'react-icons/bs'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  argTypes: {
    leftSideChild: {
      control: false
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
    variant: 'primary',
    type: 'text'
  }
}
export const ErrorInput: Story = {
  args: {
    variant: 'error',
    type: 'text'
  }
}

export const SuccessInput: Story = {
  args: {
    variant: 'success',
    type: 'text'
  }
}
export const Disabled: Story = {
  args: {
    variant: 'primary',
    type: 'text',
    disabled: true
  }
}
export const Search: Story = {
  args: {
    variant: 'primary',
    type: 'search'
  }
}

export const LeftIcon: Story = {
  args: {
    variant: 'primary',
    type: 'text',
    leftSideChild: <BsPersonFill />
  }
}

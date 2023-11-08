import type { Meta, StoryObj } from '@storybook/react'

import { ButtonGroupDemo } from './ButtonGroup.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroupDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  argTypes: {
    orientation: {
      options: ['vertical', 'horizontal'],
      control: 'radio'
    },
    variant: {
      options: ['primary', 'secondary'],
      control: 'radio'
    }
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ButtonGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ButtonGroupPrimaryHorizontal: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'primary'
  }
}
export const ButtonGroupPrimaryVertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'primary'
  }
}
export const ButtonGroupSecondaryHorizontal: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'secondary'
  }
}
export const ButtonGroupSecondaryVertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'secondary'
  }
}

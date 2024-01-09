import type { Meta, StoryObj } from '@storybook/react'

import { ModalInfoDemo } from './ModalInfo.example'
import { ModalCustomDemo } from './ModalCustom.example'
import { ModalFormDemo } from './ModalForm.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Modal',
  component: ModalFormDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  argTypes: {
    className: {
      control: 'text',
      description: 'Alter the className to change the style'
    }
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ModalFormDemo>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Info: Story = {
  render: () => <ModalInfoDemo />
}

export const Custom: Story = {
  render: () => <ModalCustomDemo />
}

export const Form: Story = {
  render: () => <ModalFormDemo />
}

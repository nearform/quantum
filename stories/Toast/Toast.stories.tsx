import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  ToastDemo,
  ToastDescriptionDemo,
  ToastTriggerDemo,
  ToastVariants
} from './Toast.example'

const meta = {
  title: 'Components/Toast',
  component: ToastDemo,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      options: ['success', 'error', 'warning', 'info'],
      control: 'inline-radio'
    },
    withAction: { control: 'boolean' },
    withClose: { control: 'boolean' }
  }
} satisfies Meta<typeof ToastDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'success',
    withAction: true,
    withClose: false
  }
}

export const Variants: Story = {
  render: () => <ToastVariants />
}

export const WithAction: Story = {
  render: () => <ToastVariants withAction />
}

export const WithDescription: Story = {
  render: () => <ToastDescriptionDemo />
}

export const Triggered: Story = {
  render: () => <ToastTriggerDemo />
}

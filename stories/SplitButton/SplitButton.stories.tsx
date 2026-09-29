import type { Meta, StoryObj } from '@storybook/react-vite'

import { SplitButtonDemo, SplitButtonStates } from './SplitButton.example'

const meta = {
  title: 'Components/SplitButton',
  component: SplitButtonDemo,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: 'inline-radio'
    },
    size: {
      options: ['md', 'sm'],
      control: 'inline-radio'
    },
    align: {
      options: ['start', 'center', 'end'],
      control: 'inline-radio'
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    menuLabel: { control: 'text' }
  }
} satisfies Meta<typeof SplitButtonDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  }
}

export const Small: Story = {
  args: {
    size: 'sm'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const PrimaryStates: Story = {
  render: () => <SplitButtonStates variant="primary" />
}

export const SecondaryStates: Story = {
  render: () => <SplitButtonStates variant="secondary" />
}

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/Button'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    controls: {
      hideNoControlsWarning: true
    }
  },
  args: {
    children: 'Button Text',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'success', 'danger']
    },
    size: {
      control: 'radio',
      options: ['icon', 'xs', 'sm', 'md', 'lg']
    },
    asChild: {
      table: {
        disable: true
      }
    }
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
}

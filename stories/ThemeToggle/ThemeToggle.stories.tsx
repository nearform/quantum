import type { Meta, StoryObj } from '@storybook/react-vite'

import { BsMoon, IconButton, ThemeToggle } from '@/index'

const meta = {
  title: 'Utility/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary']
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg']
    },
    shape: {
      control: 'inline-radio',
      options: ['rounded', 'circle']
    }
  }
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { theme: 'single' },
  render: props => <ThemeToggle {...props} />
}

export const Appearance: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton
        variant="tertiary"
        size="sm"
        icon={<BsMoon aria-hidden="true" />}
        label="Use dark theme"
      />
      <span className="text-sm text-foreground-muted dark:text-foreground-muted-dark">
        Light mode shows moon
      </span>
    </div>
  )
}

export const Circle: Story = {
  render: () => (
    <IconButton
      variant="tertiary"
      size="sm"
      shape="circle"
      icon={<BsMoon aria-hidden="true" />}
      label="Use dark theme"
    />
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <IconButton
          key={size}
          variant="tertiary"
          size={size}
          icon={<BsMoon aria-hidden="true" />}
          label="Use dark theme"
        />
      ))}
    </div>
  )
}

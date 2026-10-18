import * as React from 'react'
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { ThemeToggle } from '@/index'

const Surface = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(
    () => () => document.documentElement.classList.remove('dark'),
    []
  )

  return (
    <div className="flex w-80 items-center justify-between gap-4 rounded-lg border border-border bg-background p-4 text-foreground dark:border-border-dark dark:bg-background-dark dark:text-foreground-dark">
      <span className="text-sm">Page surface</span>
      {children}
    </div>
  )
}

const withSurface: Decorator = Story => (
  <Surface>
    <Story />
  </Surface>
)

const meta = {
  title: 'Utility/ThemeToggle',
  component: ThemeToggle,
  decorators: [withSurface],
  globals: { theme: 'single' },
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'success', 'danger']
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
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button')
    const before = button.getAttribute('aria-label')

    await userEvent.click(button)
    await expect(button.getAttribute('aria-label')).not.toBe(before)
    await expect(document.documentElement.classList.contains('dark')).toBe(
      before === 'Use dark theme'
    )

    await userEvent.click(button)
    await expect(button.getAttribute('aria-label')).toBe(before)
  }
}

export const Circle: Story = {
  args: {
    shape: 'circle'
  }
}

export const Sizes: Story = {
  render: props => (
    <div className="flex items-center gap-2">
      <ThemeToggle {...props} size="xs" />
      <ThemeToggle {...props} size="sm" />
      <ThemeToggle {...props} size="md" />
      <ThemeToggle {...props} size="lg" />
    </div>
  )
}

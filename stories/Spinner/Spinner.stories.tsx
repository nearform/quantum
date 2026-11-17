import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Button, Spinner, spinnerVariants } from '@/index'
import { cn } from '@/lib/utils'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'default', 'lg']
    },
    label: { control: 'text' }
  },
  args: {
    label: 'Loading'
  }
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <div className="text-foreground dark:text-foreground-dark">
      <Spinner {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const statuses = within(canvasElement).getAllByRole('status')
    for (const status of statuses) {
      await expect(status).toHaveTextContent('Loading')
    }
  }
}

export const Sizes: Story = {
  render: args => (
    <div className="flex items-center gap-6 text-foreground dark:text-foreground-dark">
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="default" />
      <Spinner {...args} size="lg" />
    </div>
  )
}

export const WithVisibleText: Story = {
  args: { label: undefined },
  render: args => (
    <div
      role="status"
      className="flex items-center gap-3 text-sm text-foreground dark:text-foreground-dark"
    >
      <Spinner {...args} />
      Loading results…
    </div>
  )
}

export const ColourContexts: Story = {
  args: { label: undefined },
  render: args => (
    <div className="flex flex-col items-start gap-6">
      <Button variant="primary" aria-busy="true">
        <span className="flex items-center gap-2">
          <Spinner {...args} size="sm" />
          Saving…
        </span>
      </Button>
      <div className="flex items-center gap-3 rounded-lg bg-background-surface p-4 text-sm text-foreground dark:bg-background-surface-dark dark:text-foreground-dark">
        <Spinner {...args} />
        Loading panel…
      </div>
      <div className="flex items-center gap-3 text-sm text-feedback-error dark:text-feedback-error-dark">
        <Spinner {...args} />
        Inherits the error colour
      </div>
    </div>
  )
}

export const ReducedMotion: Story = {
  args: { label: undefined },
  render: () => (
    <div className="flex items-center gap-6 text-foreground dark:text-foreground-dark">
      {(['sm', 'default', 'lg'] as const).map(size => (
        <span
          key={size}
          aria-hidden="true"
          className={cn(spinnerVariants({ size }), 'animate-pulse')}
        />
      ))}
    </div>
  )
}

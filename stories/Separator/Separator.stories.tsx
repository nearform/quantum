import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Button, Separator } from '@/index'

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical']
    },
    decorative: { control: 'boolean' },
    label: { control: 'text' }
  },
  args: {
    orientation: 'horizontal',
    decorative: true
  }
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <div className="max-w-md text-sm text-foreground dark:text-foreground-dark">
      <p>Account details</p>
      <Separator {...args} className="my-4" />
      <p>Notification preferences</p>
    </div>
  )
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: args => (
    <div className="flex h-6 items-center gap-4 text-sm text-foreground dark:text-foreground-dark">
      <span>Docs</span>
      <Separator {...args} />
      <span>Changelog</span>
      <Separator {...args} />
      <span>Support</span>
    </div>
  )
}

export const WithLabel: Story = {
  args: { label: 'or' },
  render: args => (
    <div className="flex max-w-sm flex-col gap-4">
      <Button variant="primary">Sign in with SSO</Button>
      <Separator {...args} />
      <Button variant="secondary">Sign in with email</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const labels = within(canvasElement).getAllByText('or')
    for (const label of labels) {
      await expect(label).toBeVisible()
    }
  }
}

export const VerticalWithLabel: Story = {
  args: { orientation: 'vertical', label: 'or' },
  render: args => (
    <div className="flex h-40 items-stretch gap-6">
      <div className="flex items-center">
        <Button variant="primary">Sign in with SSO</Button>
      </div>
      <Separator {...args} />
      <div className="flex items-center">
        <Button variant="secondary">Sign in with email</Button>
      </div>
    </div>
  )
}

export const Semantic: Story = {
  args: { decorative: false, label: 'Older messages' },
  render: args => (
    <div className="flex max-w-md flex-col gap-4 text-sm text-foreground dark:text-foreground-dark">
      <p>Thanks, that fixed it.</p>
      <Separator {...args} />
      <p>Is the build still failing on main?</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const separators = within(canvasElement).getAllByRole('separator', {
      name: 'Older messages'
    })
    await expect(separators.length).toBeGreaterThan(0)
  }
}

export const InACard: Story = {
  render: args => (
    <div className="max-w-sm rounded-lg border border-border-subtle bg-background-surface p-6 text-sm text-foreground dark:border-border-subtle-dark dark:bg-background-surface-dark dark:text-foreground-dark">
      <p className="font-semibold">Pro plan</p>
      <p className="text-foreground-muted dark:text-foreground-muted-dark">
        £12 per seat, billed monthly
      </p>
      <Separator {...args} className="my-4" />
      <div className="flex items-center gap-3">
        <Button variant="secondary">Cancel</Button>
        <Separator {...args} orientation="vertical" />
        <Button variant="primary">Upgrade</Button>
      </div>
    </div>
  )
}

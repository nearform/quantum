import type { Meta, StoryObj } from '@storybook/react'

import { PopoverDemo } from './Popover.example'

const meta = {
  title: 'Components/Popover',
  component: PopoverDemo,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof PopoverDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { example: 'list' } }

export const ScrollableList: Story = { args: { example: 'scrollableList' } }

export const Radio: Story = { args: { example: 'radio' } }


import type { Meta, StoryObj } from '@storybook/react'

import { ToolTipDemo } from './Tooltip.example'

const meta = {
  title: 'Components/Tooltip',
  component: ToolTipDemo,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof ToolTipDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LeftSide: Story = {
  args: {
    side: 'left'
  }
}

export const RightSideNoOffset: Story = {
  args: {
    side: 'right',
    sideOffset: 0
  }
}

export const BottomChangeColour: Story = {
  args: {
    side: 'bottom',
    className:
      'fill-secondary-700 bg-secondary-700 dark:fill-secondary-700 dark:bg-secondary-700 dark:text-foreground-inverse'
  }
}
export const PassComponentIntoContent: Story = {
  args: {
    componentAsContent: true
  }
}

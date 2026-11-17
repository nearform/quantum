import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { ProgressBar } from '@/index'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } }
  },
  decorators: [
    Story => (
      <div className="w-[480px]">
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    value: 40,
    'aria-label': 'Uploading report.pdf'
  }
}

export const Indeterminate: Story = {
  args: {
    'aria-label': 'Uploading report.pdf'
  }
}

export const CustomRange: Story = {
  args: {
    value: 3,
    min: 0,
    max: 10,
    'aria-label': 'Files uploaded',
    'aria-valuetext': '3 of 10 files'
  }
}

export const WithVisibleLabel: Story = {
  args: {
    value: 3,
    max: 10,
    'aria-labelledby': 'upload-label',
    'aria-valuetext': '3 of 10 files'
  },
  render: args => (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm text-foreground dark:text-foreground-dark">
        <span id="upload-label">Uploading files</span>
        <span aria-hidden="true">3 of 10</span>
      </div>
      <ProgressBar {...args} />
    </div>
  )
}

export const Complete: Story = {
  args: {
    value: 100,
    'aria-label': 'Upload complete'
  }
}

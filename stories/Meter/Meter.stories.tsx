import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Meter } from '@/index'

const meta = {
  title: 'Components/Meter',
  component: Meter,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Meter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    max: 1250,
    segments: [
      { value: 1100, variant: 'primary', label: 'Approved' },
      { value: 100, variant: 'primary', pattern: 'striped', label: 'Pending' }
    ],
    formatValue: v => `€${v.toLocaleString()}`
  },
  render: args => (
    <div className="w-[480px]">
      <Meter {...args} />
    </div>
  )
}

export const WithMarker: Story = {
  args: {
    max: 1250,
    segments: [
      { value: 1100, label: 'Approved' },
      { value: 100, pattern: 'striped', label: 'Pending' }
    ],
    marker: { at: 0.4, label: 'Today' },
    formatValue: v => `€${v.toLocaleString()}`
  },
  render: args => (
    <div className="w-[480px]">
      <Meter {...args} />
    </div>
  )
}

export const OverLimit: Story = {
  args: {
    max: 1250,
    segments: [
      { value: 1100, label: 'Approved' },
      { value: 200, pattern: 'striped', label: 'Pending' }
    ],
    formatValue: v => `€${v.toLocaleString()}`
  },
  render: args => (
    <div className="w-[480px]">
      <Meter {...args} />
    </div>
  )
}

export const Empty: Story = {
  args: {
    max: 1000,
    segments: [],
    formatValue: v => `${v} GB`
  },
  render: args => (
    <div className="w-[480px]">
      <Meter {...args} />
    </div>
  )
}

export const Full: Story = {
  args: {
    max: 100,
    segments: [{ value: 100, label: 'Used' }],
    formatValue: v => `${v}%`
  },
  render: args => (
    <div className="w-[480px]">
      <Meter {...args} />
    </div>
  )
}

export const MultipleSegments: Story = {
  args: {
    max: 500,
    segments: [
      { value: 200, label: 'Storage' },
      { value: 150, pattern: 'striped', label: 'Bandwidth' },
      { value: 50, label: 'Compute' }
    ],
    marker: { at: 0.6, label: 'Quota warning' },
    formatValue: v => `${v} GB`
  },
  render: args => (
    <div className="w-[480px]">
      <Meter {...args} />
    </div>
  )
}

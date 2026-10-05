import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Notice } from '@/index'
import type { NoticeVariant } from '@/index'

const VARIANTS: NoticeVariant[] = [
  'warning-filled',
  'info-filled',
  'warning',
  'info'
]

const meta = {
  title: 'Components/Notice',
  component: Notice,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    variant: {
      options: VARIANTS,
      control: 'select'
    },
    onDismiss: { control: false },
    icon: { control: false }
  }
} satisfies Meta<typeof Notice>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'info',
    children: 'Note, this project is in active development.'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map(variant => (
        <Notice key={variant} variant={variant}>
          Note, this project is in active development.
        </Notice>
      ))}
    </div>
  )
}

export const Dismissible: Story = {
  render: function Render() {
    const [dismissed, setDismissed] = useState<NoticeVariant[]>([])

    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.filter(v => !dismissed.includes(v)).map(variant => (
          <Notice
            key={variant}
            variant={variant}
            onDismiss={() => setDismissed(prev => [...prev, variant])}
          >
            Note, this project is in active development.
          </Notice>
        ))}
        {dismissed.length > 0 && (
          <button
            className="text-sm underline"
            onClick={() => setDismissed([])}
          >
            Show all again
          </button>
        )}
      </div>
    )
  }
}

export const NoIcon: Story = {
  args: {
    variant: 'info',
    icon: null,
    children: 'Note, this project is in active development.'
  }
}

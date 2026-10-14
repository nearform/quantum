import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Link, Notice } from '@/index'
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

export const WithLink: Story = {
  args: {
    variant: 'warning',
    children: (
      <>
        Runs can&apos;t start until Claude is connected. Add an API key in{' '}
        <Link href="#" variant="inline">
          Settings
        </Link>
        .
      </>
    )
  }
}

export const WithTitle: Story = {
  args: {
    variant: 'warning',
    title: 'Runs can’t start until this is set up',
    description: 'Fix the items below, then try again.',
    children: (
      <ul className="list-disc pl-5">
        <li>
          No API key. Add one in{' '}
          <Link href="#" variant="inline">
            Settings
          </Link>
          .
        </li>
        <li>
          No checkout for <code>nearform/quantum</code>.{' '}
          <Link href="#" variant="inline">
            Clone it
          </Link>
          .
        </li>
      </ul>
    )
  }
}

export const TitleVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map(variant => (
        <Notice
          key={variant}
          variant={variant}
          title="Scheduled maintenance"
          onDismiss={() => {}}
        >
          <p>The service will be unavailable on Saturday from 02:00 UTC.</p>
          <p>Save your work before then.</p>
        </Notice>
      ))}
    </div>
  )
}

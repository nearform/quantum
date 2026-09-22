import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge, BsCheckCircleFill, BsEnvelopeFill } from '@/index'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      options: ['default', 'info', 'success', 'warning', 'error'],
      control: 'select'
    },
    size: {
      options: ['sm', 'default', 'lg'],
      control: 'inline-radio'
    },
    shape: {
      options: ['rounded', 'pill'],
      control: 'inline-radio'
    },
    icon: {
      control: false
    }
  }
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default'
  }
}

export const Variants: Story = {
  args: {
    children: 'Badge'
  },
  render: props => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...props} variant="default">
        Default
      </Badge>
      <Badge {...props} variant="info">
        Info
      </Badge>
      <Badge {...props} variant="success">
        Success
      </Badge>
      <Badge {...props} variant="warning">
        Warning
      </Badge>
      <Badge {...props} variant="error">
        Error
      </Badge>
    </div>
  )
}

export const Sizes: Story = {
  args: {
    variant: 'info',
    children: 'Badge'
  },
  render: props => (
    <div className="flex items-center gap-2">
      <Badge {...props} size="sm" />
      <Badge {...props} size="default" />
      <Badge {...props} size="lg" />
    </div>
  )
}

export const Pill: Story = {
  args: {
    variant: 'success',
    shape: 'pill',
    children: 'Published'
  }
}

export const WithDot: Story = {
  args: {
    children: 'Badge'
  },
  render: props => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...props} dot shape="pill" variant="success">
        Online
      </Badge>
      <Badge {...props} dot shape="pill" variant="warning">
        Away
      </Badge>
      <Badge {...props} dot shape="pill" variant="error">
        Offline
      </Badge>
    </div>
  )
}

export const WithIcon: Story = {
  args: {
    variant: 'success',
    icon: <BsCheckCircleFill className="h-3 w-3" />,
    children: 'Verified'
  }
}

export const Count: Story = {
  args: {},
  render: () => (
    <span className="inline-flex items-center gap-2 text-foreground dark:text-foreground-dark">
      <BsEnvelopeFill aria-hidden="true" className="h-4 w-4" />
      Inbox
      <Badge variant="error" shape="pill" size="sm" aria-label="3 unread">
        3
      </Badge>
    </span>
  )
}

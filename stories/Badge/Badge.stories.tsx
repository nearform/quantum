import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge, BsCheckCircleFill, BsEnvelopeFill } from '@/index'

const VARIANTS = [
  'default',
  'warning',
  'success',
  'error',
  'info',
  'active',
  'disabled'
] as const

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      options: VARIANTS,
      control: 'select'
    },
    size: {
      options: ['sm', 'default', 'lg'],
      control: 'inline-radio'
    },
    shape: {
      options: ['rounded', 'circle'],
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
    children: '1'
  }
}

export const Variants: Story = {
  args: {
    children: '1'
  },
  render: props => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {VARIANTS.map(variant => (
          <Badge {...props} key={variant} variant={variant} />
        ))}
      </div>
      <div className="flex items-center gap-2">
        {VARIANTS.map(variant => (
          <Badge {...props} key={variant} variant={variant} shape="circle" />
        ))}
      </div>
    </div>
  )
}

export const Circle: Story = {
  args: {
    variant: 'error',
    shape: 'circle',
    children: '1'
  }
}

export const Sizes: Story = {
  args: {
    variant: 'info',
    children: '1'
  },
  render: props => (
    <div className="flex items-center gap-2">
      <Badge {...props} size="sm" />
      <Badge {...props} size="default" />
      <Badge {...props} size="lg" />
    </div>
  )
}

// A badge is sized from a single digit up, so it holds a word without any
// extra work -- the min-width simply stops applying.
export const WithText: Story = {
  args: {
    variant: 'success',
    children: 'Published'
  }
}

export const WithDot: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge dot variant="success">
        Online
      </Badge>
      <Badge dot variant="warning">
        Away
      </Badge>
      <Badge dot variant="error">
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
      <Badge variant="error" shape="circle" aria-label="3 unread">
        3
      </Badge>
    </span>
  )
}

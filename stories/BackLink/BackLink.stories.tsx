import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { BackLink } from '@/index'

const meta = {
  title: 'Components/BackLink',
  component: BackLink,
  parameters: {
    layout: 'centered'
  },
  args: {
    href: '#',
    children: 'Back'
  },
  argTypes: {
    onClick: {
      action: 'clicked'
    },
    size: {
      options: ['md', 'sm'],
      control: { type: 'radio' }
    },
    children: { control: 'text' }
  }
} satisfies Meta<typeof BackLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: {
    size: 'sm'
  }
}

export const CustomLabel: Story = {
  args: {
    children: 'Back to results'
  }
}

const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
>(({ to, ...props }, ref) => <a ref={ref} href={to} {...props} />)
RouterLink.displayName = 'RouterLink'

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <RouterLink to="#">Back to Main Page</RouterLink>
  },
  argTypes: {
    children: { control: false }
  }
}

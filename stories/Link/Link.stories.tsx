import type { Meta, StoryObj } from '@storybook/react-vite'
import { BsChevronLeft, BsHouse, BsPersonFill } from '@/assets'

import { Link } from '@/index'

const icons = { BsChevronLeft, BsHouse, BsPersonFill }

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: 'Link',
    target: '_blank',
    tabIndex: 0
  },
  argTypes: {
    variant: {
      options: ['nav', 'inline'],
      control: { type: 'inline-radio' }
    },
    onClick: {
      action: 'clicked'
    },
    tabIndex: {
      table: {
        disable: true
      }
    },
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
        labels: {
          BsChevronLeft: 'Chevron left',
          BsHouse: 'Home',
          BsPersonFill: 'User'
        }
      }
    }
  }
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: 'http://www.example.com/1'
  }
}

export const Selected: Story = {
  args: {
    selected: true,
    href: 'http://www.example.com/2'
  }
}

export const WithIcon: Story = {
  args: {
    icon: icons.BsChevronLeft,
    href: 'http://www.example.com/3'
  }
}

export const Inline: Story = {
  args: {
    variant: 'inline',
    href: 'http://www.example.com/4'
  },
  render: args => (
    <p className="max-w-sm text-sm text-foreground dark:text-foreground-dark">
      Runs can&apos;t start until Claude is connected. Add an API key in{' '}
      <Link {...args}>Settings</Link>, then try again.
    </p>
  )
}

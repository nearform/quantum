import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, BsBuildingsFill } from '@/index'

// Served from `public/` by Storybook's `staticDirs`, so the image resolves
// offline and the story stays deterministic in CI.
const exampleImage = '/avatar-example.svg'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
      control: 'select'
    },
    shape: {
      options: ['circle', 'square'],
      control: 'inline-radio'
    },
    icon: {
      control: false
    }
  }
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Ada Lovelace'
  }
}

export const WithImage: Story = {
  args: {
    name: 'Ada Lovelace',
    src: exampleImage
  }
}

export const BrokenImage: Story = {
  args: {
    name: 'Ada Lovelace',
    src: '/this-image-does-not-exist.png'
  }
}

export const WithoutName: Story = {
  args: {}
}

export const CustomInitials: Story = {
  args: {
    name: 'Quantum Design System',
    initials: 'QDS'
  }
}

export const CustomIcon: Story = {
  args: {
    alt: 'Nearform',
    icon: <BsBuildingsFill className="h-5 w-5" />
  }
}

export const Square: Story = {
  args: {
    name: 'Ada Lovelace',
    src: exampleImage,
    shape: 'square'
  }
}

export const Sizes: Story = {
  args: {
    name: 'Ada Lovelace'
  },
  render: props => (
    <div className="flex items-end gap-4">
      <Avatar {...props} size="xs" />
      <Avatar {...props} size="sm" />
      <Avatar {...props} size="default" />
      <Avatar {...props} size="lg" />
      <Avatar {...props} size="xl" />
    </div>
  )
}

export const Stacked: Story = {
  args: {},
  render: () => {
    // The ring separates each avatar from the one it overlaps, so it takes the
    // colour of the surface behind them rather than a colour of its own.
    const ring = 'ring-2 ring-background dark:ring-background-dark'

    return (
      <div className="flex -space-x-2">
        <Avatar name="Ada Lovelace" className={ring} />
        <Avatar name="Grace Hopper" src={exampleImage} className={ring} />
        <Avatar name="Alan Turing" className={ring} />
        <Avatar initials="+3" alt="3 more people" className={ring} />
      </div>
    )
  }
}

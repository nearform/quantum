import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeroButton } from '@/components/HeroButton'
import { BsChevronLeft, BsChevronRight } from '@/assets'

const meta = {
  title: 'Form/HeroButton',
  component: HeroButton,
  parameters: {
    layout: 'centered',
    controls: {
      hideNoControlsWarning: true
    }
  },
  args: {
    children: 'Get Started',
    size: 'lg'
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary']
    },
    size: {
      control: 'radio',
      options: ['md', 'lg', 'xl']
    },
    disabled: {
      control: 'boolean'
    },
    asChild: {
      table: {
        disable: true
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof HeroButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  }
}

export const LeftIcon: Story = {
  args: {
    variant: 'primary',
    leftSideChild: <BsChevronLeft />
  }
}

export const RightIcon: Story = {
  args: {
    variant: 'secondary',
    rightSideChild: <BsChevronRight />
  }
}

export const BothIcons: Story = {
  args: {
    variant: 'primary',
    leftSideChild: <BsChevronLeft />,
    rightSideChild: <BsChevronRight />
  }
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true
  }
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      {(['xl', 'lg', 'md'] as const).map(size => (
        <div key={size} className="flex items-start gap-2">
          <HeroButton variant="primary" size={size}>
            {size} primary
          </HeroButton>
          <HeroButton variant="secondary" size={size}>
            {size} secondary
          </HeroButton>
        </div>
      ))}
    </div>
  )
}

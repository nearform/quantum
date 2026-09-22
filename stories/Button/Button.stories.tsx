import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Button } from '@/components/Button'
import { BsChevronLeft, BsChevronRight } from '@/assets'

const SIZES = ['xs', 'sm', 'md', 'lg'] as const
const VARIANTS = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'danger'
] as const

/**
 * The height of a button at each size, which `Input`'s docs publish as the
 * table a form author lines their controls up against.
 */
const HEIGHTS: Record<(typeof SIZES)[number], number> = {
  xs: 36,
  sm: 36,
  md: 40,
  lg: 48
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    controls: {
      hideNoControlsWarning: true
    }
  },
  args: {
    children: 'Button Text',
    size: 'md'
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'success', 'danger']
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg']
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
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
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

export const Tertiary: Story = {
  args: {
    variant: 'tertiary'
  }
}

export const Success: Story = {
  args: {
    variant: 'success'
  }
}

export const Danger: Story = {
  args: {
    variant: 'danger'
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
    variant: 'success',
    rightSideChild: <BsChevronRight />
  }
}
export const BothIcon: Story = {
  args: {
    variant: 'tertiary',
    leftSideChild: <BsChevronLeft />,
    rightSideChild: <BsChevronRight />
  }
}

/**
 * Every variant at every size.
 *
 * A button's height is not a `h-*` utility -- it falls out of the padding, the
 * line box and the border -- so the variants agreeing on it is arithmetic
 * rather than a shared class, and `secondary` only agrees because the compound
 * variants take its 2px border back out of its padding. Read off the class
 * lists that looks like a discrepancy: `secondary lg` is `py-2.5` where
 * `primary lg` is `py-3`. Measured, both are 48px, because `border-box` counts
 * the border the other variants do not have.
 *
 * Nothing enforced that, and it is the kind of agreement a later edit breaks
 * silently: a variant that gains a border, or a compound that is dropped as
 * redundant, moves one button in a row by 4px and nothing fails. So this story
 * measures it in the browser the test-runner drives, and pins the numbers the
 * docs publish along with it.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {SIZES.map(size => (
        <div key={size} data-size={size} className="flex items-start gap-2">
          {VARIANTS.map(variant => (
            <Button key={variant} variant={variant} size={size}>
              {size} {variant}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    for (const size of SIZES) {
      const row = canvasElement.querySelector(`[data-size="${size}"]`)
      const heights = [...(row?.querySelectorAll('button') ?? [])].map(
        button => button.getBoundingClientRect().height
      )

      expect(heights).toHaveLength(VARIANTS.length)
      expect(new Set(heights)).toEqual(new Set([HEIGHTS[size]]))
    }
  }
}

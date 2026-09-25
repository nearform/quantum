import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import {
  BsArrowRight,
  BsBell,
  BsPencil,
  BsPlusLg,
  BsThreeDotsVertical,
  BsTrash,
  BsX,
  Badge,
  Button,
  IconButton,
  Tooltip
} from '@/index'

const SIZES = ['xs', 'sm', 'md', 'lg'] as const
const VARIANTS = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'danger'
] as const

/**
 * The box at each size, square and matching the `Button` of the same name, so
 * the two line up in a row. These are the numbers `Button`'s own `Sizes`
 * story measures and `Input`'s docs publish as the table form authors line
 * their controls up against.
 */
const SIDES: Record<(typeof SIZES)[number], number> = {
  xs: 36,
  sm: 36,
  md: 40,
  lg: 48
}

const meta = {
  title: 'Form/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered'
  },
  args: {
    icon: <BsPlusLg />,
    label: 'Add item',
    size: 'md'
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: VARIANTS
    },
    size: {
      control: 'radio',
      options: SIZES
    },
    shape: {
      control: 'inline-radio',
      options: ['rounded', 'circle']
    },
    disabled: {
      control: 'boolean'
    },
    icon: {
      control: false
    }
  }
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: props => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {VARIANTS.map(variant => (
          <IconButton {...props} key={variant} variant={variant} />
        ))}
      </div>
      <div className="flex items-center gap-2">
        {VARIANTS.map(variant => (
          <IconButton
            {...props}
            key={variant}
            variant={variant}
            shape="circle"
          />
        ))}
      </div>
    </div>
  )
}

/**
 * `circle` is the same box with the corners taken all the way round. It is
 * the shape for a floating action or a single icon standing on its own;
 * `rounded` is the shape for one sitting beside a `Button`.
 */
export const Shapes: Story = {
  render: props => (
    <div className="flex items-center gap-2">
      <IconButton {...props} shape="rounded" />
      <IconButton {...props} shape="circle" />
    </div>
  )
}

/**
 * Every variant at every size, measured.
 *
 * The box is square and holds the height of the `Button` of the same name, so
 * an icon button and the button it sits next to are level. Nothing in either
 * component's class list says so -- `Button` arrives at its height through
 * padding and a line box, this one sets it outright -- so the agreement is
 * the kind a later edit breaks silently, in one component, with nothing
 * failing. The play function pins both numbers.
 *
 * `xs` and `sm` are deliberately the same 36px box. They are in `Button` too;
 * what changes between them is the size of the icon, exactly as the text size
 * changes there.
 */
export const Sizes: Story = {
  render: props => (
    <div className="flex flex-col gap-3">
      {SIZES.map(size => (
        <div key={size} data-size={size} className="flex items-center gap-2">
          {VARIANTS.map(variant => (
            <IconButton
              {...props}
              key={variant}
              variant={variant}
              size={size}
            />
          ))}
          <Button variant="secondary" size={size}>
            {size}
          </Button>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    for (const size of SIZES) {
      const row = canvasElement.querySelector(`[data-size="${size}"]`)
      const boxes = [...(row?.querySelectorAll('button') ?? [])].map(button =>
        button.getBoundingClientRect()
      )

      // The trailing Button is the row's reference, and is measured for its
      // height only -- it is the one element here that is not square.
      const iconButtons = boxes.slice(0, VARIANTS.length)
      const reference = boxes[VARIANTS.length]

      expect(iconButtons).toHaveLength(VARIANTS.length)
      expect(new Set(iconButtons.map(box => box.height))).toEqual(
        new Set([SIDES[size]])
      )
      expect(new Set(iconButtons.map(box => box.width))).toEqual(
        new Set([SIDES[size]])
      )
      expect(reference.height).toBe(SIDES[size])
    }
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  },
  render: props => (
    <div className="flex items-center gap-2">
      {VARIANTS.map(variant => (
        <IconButton {...props} key={variant} variant={variant} />
      ))}
    </div>
  )
}

/**
 * The label is the button's only name, so it says what the button does rather
 * than what the icon is a picture of. A row of icons with nothing else to go
 * on is the case this component exists for, and the case it is easiest to get
 * wrong.
 */
export const Labelled: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <IconButton variant="tertiary" icon={<BsPencil />} label="Edit article" />
      <IconButton
        variant="tertiary"
        icon={<BsTrash />}
        label="Delete article"
      />
      <IconButton
        variant="tertiary"
        icon={<BsThreeDotsVertical />}
        label="More actions"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const names = [...canvasElement.querySelectorAll('button')].map(button =>
      button.getAttribute('aria-label')
    )

    expect(names).toEqual(['Edit article', 'Delete article', 'More actions'])
  }
}

/**
 * A tooltip makes the name visible to everyone who is not using a screen
 * reader. Keep the two in step: WCAG 2.5.3 asks that the accessible name
 * contain the visible text, so that someone speaking what they can see hits
 * the control they are looking at.
 */
export const WithTooltip: Story = {
  render: () => (
    <Tooltip content="Notifications">
      <IconButton variant="secondary" icon={<BsBell />} label="Notifications" />
    </Tooltip>
  )
}

/**
 * The button sizes the icon, so a row of them agrees without every caller
 * repeating an `h-4 w-4`, and an icon drawn at some other size is brought
 * into line rather than setting the row's height.
 *
 * That rule lives on the button, so it is overridden on the button too --
 * `[&>svg]:h-6 [&>svg]:w-6` in `className`, which `tailwind-merge` takes as
 * replacing the default rather than joining it. A size on the icon itself
 * loses: `[&>svg]:h-4` is the more specific selector of the two.
 */
export const IconSize: Story = {
  render: props => (
    <div className="flex items-center gap-2">
      <IconButton {...props} icon={<BsArrowRight />} label="Next" />
      <IconButton
        {...props}
        icon={<BsArrowRight />}
        label="Next"
        className="[&>svg]:h-6 [&>svg]:w-6"
      />
    </div>
  )
}

/**
 * A count riding on an icon button. The badge is positioned by the wrapper
 * rather than by the button, which stays square, and it carries its own
 * `aria-label` because "3" says nothing on its own.
 */
export const WithBadge: Story = {
  render: () => (
    <span className="relative inline-flex">
      <IconButton variant="secondary" icon={<BsBell />} label="Notifications" />
      <Badge
        variant="error"
        size="sm"
        shape="circle"
        aria-label="3 unread"
        className="pointer-events-none absolute -right-1.5 -top-1.5"
      >
        3
      </Badge>
    </span>
  )
}

/**
 * The close on a panel or a dialog: `tertiary`, so it carries no weight of
 * its own, and named for what it closes rather than just "Close" when a page
 * holds more than one.
 */
export const Close: Story = {
  render: () => (
    <div className="flex w-72 items-start justify-between gap-4 rounded-lg border border-border p-4 dark:border-border-dark">
      <p className="text-sm text-foreground dark:text-foreground-dark">
        Your changes have been saved.
      </p>
      <IconButton
        variant="tertiary"
        size="sm"
        icon={<BsX />}
        label="Dismiss notification"
      />
    </div>
  )
}

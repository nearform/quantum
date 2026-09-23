import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor } from 'storybook/test'

import { Checkbox, ControlLabel } from '@/index'

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    checked: {
      options: [true, false, 'indeterminate'],
      control: { type: 'radio' }
    },
    className: {
      controle: 'text',
      description: 'Alter the className to change the style'
    }
  }
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: {
    checked: false,
    'aria-label': 'Example checkbox'
  }
}
export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': 'Example checkbox'
  }
}
export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
    'aria-label': 'Example checkbox'
  }
}

export const ColourChange: Story = {
  args: {
    checked: true,
    'aria-label': 'Example checkbox',
    className:
      'data-[state=checked]:text-yellow-200 data-[state=checked]:bg-green-900 data-[state=checked]:border-border'
  }
}

export const WithLabel: Story = {
  render: props => (
    <ControlLabel htmlFor="withLabelId" label="Label">
      <Checkbox id="withLabelId" {...props} />
    </ControlLabel>
  )
}

export const WithLabelAndHint: Story = {
  render: props => (
    <ControlLabel htmlFor="withHintId" label="Label" hintText="This is a hint">
      <Checkbox id="withHintId" {...props} />
    </ControlLabel>
  )
}

export const WithLabelOnTheLeft: Story = {
  render: props => (
    <ControlLabel
      htmlFor="withLabelOnTheLeftId"
      label="Label"
      hintText="This is a hint"
      position="left"
    >
      <Checkbox id="withLabelOnTheLeftId" {...props} />
    </ControlLabel>
  )
}

/**
 * The box sits on the middle of the line rather than on its baseline, so
 * ticking it moves neither the box nor the line it is on.
 */
export const InALineOfText: Story = {
  render: props => (
    <p data-testid="line">
      Tick <Checkbox aria-label="Example checkbox" {...props} /> and nothing
      around it moves.
    </p>
  ),
  play: async ({ canvasElement }) => {
    const box = canvasElement.querySelector<HTMLElement>(
      'button[role="checkbox"]'
    )
    const line = canvasElement.querySelector<HTMLElement>(
      '[data-testid="line"]'
    )

    if (!box || !line) {
      throw new Error('the story did not render a checkbox on a line of text')
    }

    const measure = () => ({
      box: box.getBoundingClientRect(),
      line: line.getBoundingClientRect()
    })

    const before = measure()

    await userEvent.click(box)
    await waitFor(() => expect(box).toHaveAttribute('data-state', 'checked'))

    const after = measure()

    expect(after.box.top).toBe(before.box.top)
    expect(after.box.height).toBe(before.box.height)
    expect(after.line.top).toBe(before.line.top)
    expect(after.line.height).toBe(before.line.height)
  }
}

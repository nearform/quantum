import type { Meta, StoryObj } from '@storybook/react'

import { CardDemo } from './Card.example'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Card',
  component: CardDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  }
} satisfies Meta<typeof CardDemo>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Option: Story = {
  args: {
    variant: 'option',
    headingText: 'Header',
    description:
      'This is an example of a card that is selectable via clicking on a checkbox, or the card itself'
  }
}

export const Simple: Story = {
  args: {
    variant: 'simple',
    headingText: 'Header',
    description: 'Description'
  }
}

export const Toggie: Story = {
  args: {
    variant: 'toggle',
    headingText: 'Label'
  }
}

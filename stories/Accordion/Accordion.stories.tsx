import type { Meta, StoryObj } from '@storybook/react'

import { AccordionDemo } from './Accordion.example'

const meta = {
  title: 'Components/Accordion',
  component: AccordionDemo,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    className: {
      controle: 'text',
      description: 'Alter the className to change the style'
    }
  }
} satisfies Meta<typeof AccordionDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

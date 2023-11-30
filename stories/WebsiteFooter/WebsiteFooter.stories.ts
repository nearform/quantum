import { Meta, StoryObj } from '@storybook/react'

import { WebsiteFooter } from '@/index'

const meta = {
  title: 'Components/WebsiteFooter',
  component: WebsiteFooter,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof WebsiteFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}


import { Meta, StoryObj } from '@storybook/react-vite'

import { AppHeaderDemo } from './AppHeader.example'

const meta = {
  title: 'Components/App Header',
  component: AppHeaderDemo,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof AppHeaderDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

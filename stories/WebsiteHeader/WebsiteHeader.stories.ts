import { Meta, StoryObj } from '@storybook/react-vite'

import {
  WebsiteHeaderDemo,
  WebsiteHeaderWithoutMobileMenuDemo
} from './WebsiteHeader.example'

const meta = {
  title: 'Components/Website Header',
  component: WebsiteHeaderDemo,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof WebsiteHeaderDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutMobileMenu: Story = {
  render: () => WebsiteHeaderWithoutMobileMenuDemo()
}

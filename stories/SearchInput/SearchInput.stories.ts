import type { Meta, StoryObj } from '@storybook/react'

import { SearchInputDemo } from './SearchInput.example'

const meta = {
  title: 'Form/SearchInput',
  component: SearchInputDemo,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof SearchInputDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default'
  }
}

export const Example: Story = {
  args: {
    variant: 'example'
  }
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { SortAndShow, SortAndShowControl } from '@/index'

const sortOptions = [
  { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
  { value: 'reverse-alphabetical', label: 'Alphabetical (Z-A)' },
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' }
]

const showOptions = ['10', '20', '50', '100'].map(value => ({
  value,
  label: value
}))

const meta = {
  title: 'Components/SortAndShow',
  component: SortAndShowControl,
  parameters: {
    layout: 'centered'
  },
  args: {
    label: 'Sort by',
    options: sortOptions,
    defaultValue: 'alphabetical',
    disabled: false
  },
  argTypes: {
    label: { control: 'text' },
    options: { control: false },
    disabled: { control: 'boolean' }
  },
  render: args => (
    <SortAndShow>
      <SortAndShowControl {...args} />
    </SortAndShow>
  )
} satisfies Meta<typeof SortAndShowControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SortAndShowResults: Story = {
  render: () => (
    <SortAndShow>
      <SortAndShowControl
        label="Sort by"
        options={sortOptions}
        defaultValue="alphabetical"
      />
      <SortAndShowControl
        label="Show"
        options={showOptions}
        defaultValue="20"
      />
    </SortAndShow>
  )
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const DarkMode: Story = {
  ...Default,
  name: 'Dark mode',
  globals: { theme: 'dark' }
}

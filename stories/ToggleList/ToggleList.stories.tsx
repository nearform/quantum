import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { ToggleList, ToggleListItem } from '@/index'

const meta = {
  title: 'Components/ToggleList',
  component: ToggleListItem,
  parameters: {
    layout: 'centered'
  },
  args: {
    label: 'Label',
    removeLabel: 'Remove label',
    defaultChecked: true,
    disabled: false,
    onRemove: () => {}
  },
  argTypes: {
    label: { control: 'text' },
    removeLabel: { control: 'text' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onRemove: { control: false }
  },
  render: args => (
    <ToggleList className="w-64">
      <ToggleListItem {...args} />
    </ToggleList>
  )
} satisfies Meta<typeof ToggleListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const initialItems = [
  { id: 'email', label: 'Email', checked: true },
  { id: 'sms', label: 'SMS', checked: true },
  { id: 'push', label: 'Push notifications', checked: false },
  { id: 'newsletter', label: 'Newsletter', checked: true },
  { id: 'offers', label: 'Offers', checked: false }
]

const ToggleListDemo = () => {
  const [items, setItems] = React.useState(initialItems)

  return (
    <ToggleList className="w-64">
      {items.map(item => (
        <ToggleListItem
          key={item.id}
          label={item.label}
          checked={item.checked}
          onCheckedChange={checked =>
            setItems(current =>
              current.map(other =>
                other.id === item.id ? { ...other, checked } : other
              )
            )
          }
          onRemove={() =>
            setItems(current => current.filter(other => other.id !== item.id))
          }
          removeLabel={`Remove ${item.label}`}
        />
      ))}
    </ToggleList>
  )
}

export const List: Story = {
  render: () => <ToggleListDemo />
}

export const WithoutRemove: Story = {
  args: {
    onRemove: undefined,
    removeLabel: undefined
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

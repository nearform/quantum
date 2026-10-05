import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  CardDemo,
  CardStates,
  FilledCardDemo,
  SelectableCardDemo,
  SwitchCardDemo
} from './Card.example'

const meta = {
  title: 'Components/Card',
  component: CardDemo,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      options: ['outline', 'filled'],
      control: 'inline-radio'
    },
    interactive: { control: 'boolean' },
    selected: { control: 'boolean' }
  }
} satisfies Meta<typeof CardDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'outline'
  }
}

export const Filled: Story = {
  render: () => <FilledCardDemo />
}

export const States: Story = {
  render: () => <CardStates />
}

export const Selectable: Story = {
  render: () => <SelectableCardDemo />
}

export const WithSwitch: Story = {
  render: () => <SwitchCardDemo />
}

export const DarkMode: Story = {
  ...States,
  name: 'Dark mode',
  globals: { theme: 'dark' }
}

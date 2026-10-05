import type { Meta, StoryObj } from '@storybook/react-vite'

import { BsDiagram2, BsFileEarmarkPlus, BsPeople, BsStar } from '@/assets'
import { Stat, Stats } from '@/index'

const meta = {
  title: 'Components/Stats',
  component: Stat,
  parameters: {
    layout: 'centered'
  },
  args: {
    icon: BsPeople,
    label: 'Stat',
    value: 20
  },
  argTypes: {
    icon: { control: false },
    label: { control: 'text' },
    value: { control: 'text' }
  },
  render: args => (
    <Stats>
      <Stat {...args} />
    </Stats>
  )
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Group: Story = {
  render: () => (
    <Stats>
      <Stat icon={BsPeople} label="Contributors" value={20} />
      <Stat icon={BsFileEarmarkPlus} label="Used by" value={6} />
      <Stat icon={BsStar} label="Stars" value={7} />
      <Stat icon={BsDiagram2} label="Fork" value={3} />
    </Stats>
  )
}

export const WithoutIcon: Story = {
  args: {
    icon: undefined,
    label: 'Downloads',
    value: '1.2k'
  }
}

export const DarkMode: Story = {
  ...Group,
  name: 'Dark mode',
  globals: { theme: 'dark' }
}

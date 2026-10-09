import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from '@/index'

const meta = {
  title: 'Form/Slider',
  component: Slider,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    Story => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    'aria-label': 'Example slider'
  }
}

export const WithEndLabels: Story = {
  args: {
    defaultValue: [50],
    minLabel: '0',
    maxLabel: '100',
    'aria-label': 'Slider with end labels'
  }
}

export const WithRange: Story = {
  args: {
    defaultValue: [25, 75],
    minLabel: '0',
    maxLabel: '100',
    'aria-label': 'Range slider'
  }
}

export const WithSteps: Story = {
  args: {
    defaultValue: [50],
    step: 10,
    minLabel: '0',
    maxLabel: '100',
    'aria-label': 'Stepped slider'
  }
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
    minLabel: '0',
    maxLabel: '100',
    'aria-label': 'Disabled slider'
  }
}

export const WithLabel: Story = {
  args: {
    defaultValue: [50],
    label: 'Volume',
    minLabel: '0',
    maxLabel: '100'
  }
}

export const WithLabelAndHint: Story = {
  args: {
    defaultValue: [70],
    label: 'Brightness',
    hintText: 'Adjust screen brightness',
    minLabel: '0%',
    maxLabel: '100%'
  }
}

export const EndLabelsBelow: Story = {
  args: {
    defaultValue: [50],
    minLabel: '1',
    maxLabel: '52',
    endLabelPosition: 'below',
    'aria-label': 'Weeks'
  }
}

export const EndLabelsBelowWithLabel: Story = {
  args: {
    defaultValue: [3],
    min: 1,
    max: 10,
    label: 'Priority',
    minLabel: 'Low',
    maxLabel: 'High',
    endLabelPosition: 'below'
  }
}

export const CustomEndLabels: Story = {
  args: {
    defaultValue: [3],
    min: 1,
    max: 10,
    minLabel: 'Low',
    maxLabel: 'High',
    'aria-label': 'Priority'
  }
}

const skillLevels = [
  'Not used',
  'Beginner',
  'Intermediate',
  'Highly Proficient',
  'Teacher'
]

export const WithValueText: Story = {
  args: {
    defaultValue: [2],
    min: 0,
    max: 4,
    label: 'Skill level',
    minLabel: skillLevels[0],
    maxLabel: skillLevels[4],
    getAriaValueText: (value: number) => skillLevels[value]
  }
}

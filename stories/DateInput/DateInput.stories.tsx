import type { Meta, StoryObj } from '@storybook/react-vite'

import { DateInputDemo as DateInput } from './DateInput.example'

const meta = {
  title: 'Form/DateInput',
  component: DateInput,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      options: ['primary', 'error', 'success'],
      control: 'inline-radio'
    },
    size: {
      options: ['sm', 'default', 'lg'],
      control: 'inline-radio',
      description: 'The height of the field: 37px, 42px or 48px'
    },
    format: {
      control: 'text',
      description: 'A date-fns format string for the typed and shown date'
    },
    value: { control: false },
    min: { control: false },
    max: { control: false }
  }
} satisfies Meta<typeof DateInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    labelText: 'Date of birth'
  }
}

export const WithValue: Story = {
  parameters: { visual: { open: 'click' } },
  args: {
    labelText: 'Start date',
    value: new Date(2024, 5, 15)
  }
}

export const WithHelpText: Story = {
  args: {
    labelText: 'Start date',
    helpText: 'The first day you are available'
  }
}

export const MinAndMax: Story = {
  parameters: { visual: { open: 'click' } },
  args: {
    labelText: 'Appointment',
    helpText: 'Any day in June 2024',
    value: new Date(2024, 5, 10),
    min: new Date(2024, 5, 1),
    max: new Date(2024, 5, 30)
  }
}

export const CustomFormat: Story = {
  args: {
    labelText: 'Start date',
    format: 'yyyy-MM-dd',
    value: new Date(2024, 5, 15)
  }
}

export const Error: Story = {
  args: {
    labelText: 'Date of birth',
    variant: 'error',
    helpText: 'Enter a date in the past'
  }
}

export const Success: Story = {
  args: {
    labelText: 'Date of birth',
    variant: 'success',
    value: new Date(1990, 0, 1)
  }
}

export const Disabled: Story = {
  args: {
    labelText: 'Date of birth',
    disabled: true,
    value: new Date(1990, 0, 1)
  }
}

export const Small: Story = {
  args: {
    labelText: 'Date of birth',
    size: 'sm'
  }
}

export const Large: Story = {
  args: {
    labelText: 'Date of birth',
    size: 'lg'
  }
}

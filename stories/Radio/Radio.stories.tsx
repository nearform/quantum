import type { Meta, StoryObj } from '@storybook/react';

import { Radio, RadioGroup, ControlLabel } from '@/index';

const items = [
  { value: 'hello', label: 'Hello' },
  { value: 'world', label: 'World' },
  { value: 'goodbye', label: 'Goodbye' },
  { value: 'friend', label: 'Friend' }
];

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  render: ({ id, ...props }) => (
    <RadioGroup {...props}>
      {items.map(({ value, label }) => (
        <ControlLabel htmlFor={`${id}-${value}`} label={label}>
          <Radio id={`${id}-${value}`} value={value} />
        </ControlLabel>
      ))}
    </RadioGroup>
  ),
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    id: {
      table: {
        disable: true
      }
    },
    className: {
      table: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof RadioGroup & { position?: 'left' | 'right' }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoDefault: Story = {
  args: {
    id: 'no-default'
  }
};
export const DefaultSet: Story = {
  args: {
    defaultValue: 'goodbye',
    id: 'default'
  }
};
export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'disabled'
  }
};

/**
 * To display the labels on the left, you have to:
 * - Add the `items-end` class to `RadioGroup` component.
 * - Set the `position` property to `"left"` in the `ControlLabel` components.
 */
export const LabelsOnTheLeft: Story = {
  args: {
    defaultValue: 'hello',
    id: 'left-label'
  },
  render: ({ id, ...props }) => (
    <RadioGroup {...props} className="items-end">
      {items.map(({ value, label }) => (
        <ControlLabel htmlFor={`${id}-${value}`} label={label} position="left">
          <Radio id={`${id}-${value}`} value={value} />
        </ControlLabel>
      ))}
    </RadioGroup>
  )
};

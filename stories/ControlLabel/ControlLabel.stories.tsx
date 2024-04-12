import type { Meta, StoryObj } from '@storybook/react';

import { Switch, ControlLabel, Checkbox, Radio, RadioGroup } from '@/index';

const meta = {
  title: 'Form/ControlLabel',
  component: ControlLabel,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    varticalAlign: {
      control: 'radio',
      options: ['top', 'middle', 'bottom']
    }
  }
} satisfies Meta<typeof ControlLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    position: 'right'
  },
  render: props => (
    <ControlLabel htmlFor="defaultId" {...props}>
      <Switch id="defaultId" value="value" />
    </ControlLabel>
  )
};

export const WithHintText: Story = {
  args: {
    label: 'Label',
    hintText: 'This is a hint',
    position: 'right'
  },
  render: props => (
    <ControlLabel htmlFor="hintId" {...props}>
      <Checkbox id="hintId" value="value" />
    </ControlLabel>
  )
};

export const LeftLabel: Story = {
  args: {
    label: 'Label',
    hintText: 'This is a hint',
    position: 'left'
  },
  render: props => (
    <RadioGroup className="items-end">
      <ControlLabel htmlFor="leftId" {...props}>
        <Radio id="leftId" value="value" />
      </ControlLabel>
    </RadioGroup>
  )
};

export const VerticalAlignment: Story = {
  args: {
    label: 'Label',
    hintText: 'This is a hint',
    varticalAlign: 'middle'
  },
  render: props => (
    <ControlLabel htmlFor="verticalId" {...props}>
      <Switch id="verticalId" value="value" />
    </ControlLabel>
  )
};

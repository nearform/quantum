import type { Meta, StoryObj } from '@storybook/react';

import { Switch, ControlLabel } from '@/index';

const meta = {
  title: 'Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const WithLabel: Story = {
  render: props => (
    <ControlLabel htmlFor="withLabelId" label="Label">
      <Switch id="withLabelId" {...props} />
    </ControlLabel>
  )
};

export const WithLabelAndHint: Story = {
  render: props => (
    <ControlLabel htmlFor="withHintId" label="Label" hintText="This is a hint">
      <Switch id="withHintId" {...props} />
    </ControlLabel>
  )
};

export const WithLabelOnTheLeft: Story = {
  render: props => (
    <ControlLabel
      htmlFor="withLabelOnTheLeftId"
      label="Label"
      hintText="This is a hint"
      position="left"
    >
      <Switch id="withLabelOnTheLeftId" {...props} />
    </ControlLabel>
  )
};

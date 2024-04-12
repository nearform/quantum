import type { Meta, StoryObj } from '@storybook/react';

import { CalendarDemo } from './Calendar.example';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Calendar',
  component: CalendarDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  }
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof CalendarDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};

export const MultipleWithMax: Story = {
  args: {
    mode: 'multiple'
  }
};

export const Range: Story = {
  args: {
    mode: 'range'
  }
};
export const TwoMonths: Story = {
  args: {
    mode: 'range',
    numberOfMonths: 2
  }
};

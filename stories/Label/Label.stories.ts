import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Label',
  component: Label,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl '],
      control: 'radio'
    },
    children: {
      name: 'label'
    }
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Default-sized',
    size: 'sm'
  }
};
export const Medium: Story = {
  args: {
    children: 'Medium-sized',
    size: 'md'
  }
};
export const Large: Story = {
  args: {
    children: 'Large-sized',
    size: 'lg'
  }
};
export const ExtraLarge: Story = {
  args: {
    children: 'Extra-large-sized',
    size: 'xl'
  }
};

export const WithHint: Story = {
  args: {
    children: 'Label',
    hintText: 'This is a hint',
    size: 'sm'
  }
};

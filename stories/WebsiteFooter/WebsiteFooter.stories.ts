import { Meta, StoryObj } from '@storybook/react';

import { WebsiteFooterDemo } from './WebsiteFooter.example';

const meta = {
  title: 'Components/Website Footer',
  component: WebsiteFooterDemo,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof WebsiteFooterDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WebsiteFooterStandard: Story = {
  args: { variant: 'standard' }
};

export const WebsiteFooterComplex: Story = {
  args: { variant: 'complex' }
};

export const WebsiteFooterSmall: Story = {
  args: { variant: 'small' }
};

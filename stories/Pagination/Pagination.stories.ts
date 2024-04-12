import type { Meta, StoryObj } from '@storybook/react';

import { PaginationDemo } from './Pagination.example';

const meta = {
  title: 'Components/Pagination',
  component: PaginationDemo
} as Meta<typeof PaginationDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pagination: Story = {};

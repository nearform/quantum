import type { Meta, StoryObj } from '@storybook/react';
import { BsChevronLeft, BsHouse, BsPersonFill } from '@/assets';

import { Link } from '@/index';

const icons = { BsChevronLeft, BsHouse, BsPersonFill };

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: 'Link',
    target: '_blank',
    tabIndex: 0
  },
  argTypes: {
    onClick: {
      action: 'clicked'
    },
    tabIndex: {
      table: {
        disable: true
      }
    },
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
        labels: {
          BsChevronLeft: 'Chevron left',
          BsHouse: 'Home',
          BsPersonFill: 'User'
        }
      }
    }
  }
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'http://www.example.com/1'
  }
};

export const Selected: Story = {
  args: {
    selected: true,
    href: 'http://www.example.com/2'
  }
};

export const WithIcon: Story = {
  args: {
    icon: icons.BsChevronLeft,
    href: 'http://www.example.com/3'
  }
};

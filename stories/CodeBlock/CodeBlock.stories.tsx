import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  CodeBlockDemo,
  CodeBlockOverflow,
  CodeBlockWithoutLabel
} from './CodeBlock.example'

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlockDemo,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    label: { control: 'text' },
    language: { control: 'text' }
  }
} satisfies Meta<typeof CodeBlockDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    language: 'ts'
  }
}

export const WithoutLabel: Story = {
  render: () => <CodeBlockWithoutLabel />
}

export const Overflow: Story = {
  render: () => <CodeBlockOverflow />
}

export const DarkMode: Story = {
  ...Default,
  name: 'Dark mode',
  globals: { theme: 'dark' }
}

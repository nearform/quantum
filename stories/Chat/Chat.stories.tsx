import type { Meta, StoryObj } from '@storybook/react-vite'

import { ChatDemo, ChatBubbleDemo } from './Chat.example'

const meta = {
  title: 'Components/Chat',
  component: ChatBubbleDemo,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof ChatBubbleDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'received',
    children: 'Hey, how are you doing?',
    name: 'Ada Lovelace',
    timestamp: '10:30 AM'
  }
}

export const Sent: Story = {
  args: {
    variant: 'sent',
    children: "I'm doing great, thanks for asking!",
    timestamp: '10:31 AM'
  }
}

export const Conversation: Story = {
  args: {
    variant: 'received',
    children: 'Conversation demo'
  },
  render: () => <ChatDemo />
}

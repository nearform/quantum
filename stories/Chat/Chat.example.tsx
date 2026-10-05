import { useState } from 'react'

import {
  ChatBubble,
  ChatBubbleProps,
  ChatList,
  ChatInput,
  ChatContainer
} from '@/index'

function ChatBubbleDemo(props: ChatBubbleProps) {
  return <ChatBubble {...props} />
}

const sampleMessages = [
  {
    id: 1,
    variant: 'received' as const,
    name: 'Ada Lovelace',
    text: 'Hey! Have you seen the new design system components?',
    timestamp: '10:30 AM'
  },
  {
    id: 2,
    variant: 'sent' as const,
    text: 'Yes! The chat components look great.',
    timestamp: '10:31 AM'
  },
  {
    id: 3,
    variant: 'received' as const,
    name: 'Ada Lovelace',
    text: 'Thanks! We still need to add dark mode support and a few more variants.',
    timestamp: '10:32 AM'
  },
  {
    id: 4,
    variant: 'sent' as const,
    text: "I can help with that. Let me take a look at the tokens we've got available.",
    timestamp: '10:33 AM'
  }
]

function ChatDemo() {
  const [messages, setMessages] = useState(sampleMessages)

  return (
    <ChatContainer className="h-[480px] w-[400px]">
      <ChatList className="flex-1">
        {messages.map(msg => (
          <ChatBubble
            key={msg.id}
            variant={msg.variant}
            name={msg.name}
            timestamp={msg.timestamp}
          >
            {msg.text}
          </ChatBubble>
        ))}
      </ChatList>
      <ChatInput
        onSend={text => {
          setMessages(prev => [
            ...prev,
            {
              id: prev.length + 1,
              variant: 'sent' as const,
              text,
              timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })
            }
          ])
        }}
      />
    </ChatContainer>
  )
}

export { ChatBubbleDemo, ChatDemo }

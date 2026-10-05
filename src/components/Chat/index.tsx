'use client'

import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/Avatar'
import { BsSendFill } from '@/assets'

const bubbleVariants = cva(
  ['rounded-2xl', 'px-4', 'py-2.5', 'text-sm', 'max-w-[80%]', 'break-words'],
  {
    variants: {
      variant: {
        received: [
          'rounded-tl-sm',
          'bg-background-alt',
          'text-foreground',
          'dark:bg-background-alt-dark',
          'dark:text-foreground-dark'
        ],
        sent: [
          'rounded-tr-sm',
          'bg-accent',
          'text-foreground-inverse',
          'dark:bg-accent-dark',
          'dark:text-foreground-inverse-dark'
        ]
      }
    },
    defaultVariants: {
      variant: 'received'
    }
  }
)

interface ChatBubbleProps
  extends
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>,
    VariantProps<typeof bubbleVariants> {
  /** The message text. */
  children: React.ReactNode
  /** Name of the message sender; seeds the avatar and renders above the bubble. */
  name?: string
  /** Avatar image URL. */
  avatarSrc?: string
  /** Timestamp text rendered below the bubble. */
  timestamp?: string
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    { className, variant, children, name, avatarSrc, timestamp, ...props },
    ref
  ) => {
    const isSent = variant === 'sent'

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-2',
          isSent ? 'flex-row-reverse' : 'flex-row',
          className
        )}
        {...props}
      >
        {!isSent && (
          <Avatar
            name={name}
            src={avatarSrc}
            size="sm"
            className="mt-auto shrink-0"
          />
        )}
        <div
          className={cn('flex flex-col', isSent ? 'items-end' : 'items-start')}
        >
          {name && !isSent && (
            <span className="mb-1 text-xs font-medium text-foreground-muted dark:text-foreground-muted-dark">
              {name}
            </span>
          )}
          <div className={cn(bubbleVariants({ variant }))}>{children}</div>
          {timestamp && (
            <span className="mt-1 text-[11px] text-foreground-subtle dark:text-foreground-subtle-dark">
              {timestamp}
            </span>
          )}
        </div>
      </div>
    )
  }
)

ChatBubble.displayName = 'ChatBubble'

interface ChatListProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Chat bubbles to render. */
  children: React.ReactNode
}

const ChatList = React.forwardRef<HTMLDivElement, ChatListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="log"
      aria-label="Chat messages"
      className={cn('flex flex-col gap-3 overflow-y-auto p-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)

ChatList.displayName = 'ChatList'

interface ChatInputProps extends Omit<
  React.ComponentPropsWithoutRef<'form'>,
  'onSubmit' | 'onChange'
> {
  /** Placeholder text for the input. */
  placeholder?: string
  /** Callback fired with the message text when the user submits. */
  onSend?: (message: string) => void
  /** Controlled value of the input. */
  value?: string
  /** Callback fired when the input value changes. */
  onChange?: (value: string) => void
  /** Disables the input and send button. */
  disabled?: boolean
}

const ChatInput = React.forwardRef<HTMLFormElement, ChatInputProps>(
  (
    {
      className,
      placeholder = 'Type a message…',
      onSend,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState('')
    const controlled = value !== undefined
    const text = controlled ? value : internal

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = text.trim()
      if (!trimmed) return
      onSend?.(trimmed)
      if (!controlled) setInternal('')
    }

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(
          'flex items-end gap-2 border-t border-border p-3',
          'dark:border-border-dark',
          className
        )}
        {...props}
      >
        <textarea
          value={text}
          onChange={e => {
            const v = e.target.value
            if (controlled) onChange?.(v)
            else setInternal(v)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            'flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm',
            'text-foreground placeholder:text-foreground-muted',
            'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:border-border-dark dark:bg-background-dark dark:text-foreground-dark',
            'dark:placeholder:text-foreground-muted-dark',
            'dark:focus:border-accent-dark dark:focus:ring-accent-dark'
          )}
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          aria-label="Send message"
          className={cn(
            'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
            'bg-accent text-foreground-inverse',
            'hover:bg-accent-hover',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            'dark:bg-accent-dark dark:text-foreground-inverse-dark',
            'dark:hover:bg-accent-hover-dark',
            'dark:focus-visible:ring-accent-dark'
          )}
        >
          <BsSendFill className="h-4 w-4" />
        </button>
      </form>
    )
  }
)

ChatInput.displayName = 'ChatInput'

interface ChatContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
}

const ChatContainer = React.forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col overflow-hidden rounded-xl border border-border',
        'bg-background',
        'dark:border-border-dark dark:bg-background-dark',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

ChatContainer.displayName = 'ChatContainer'

export {
  ChatBubble,
  ChatBubbleProps,
  ChatList,
  ChatListProps,
  ChatInput,
  ChatInputProps,
  ChatContainer,
  ChatContainerProps
}

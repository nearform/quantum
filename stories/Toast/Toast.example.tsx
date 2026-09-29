import * as React from 'react'

import {
  Button,
  Toast,
  ToastAction,
  ToastClose,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/index'
import type { ToastProps, ToastVariant } from '@/index'

const messages: Record<ToastVariant, { title: string; action: string }> = {
  success: { title: 'Your settings have been saved', action: 'Undo' },
  error: { title: 'An error has occurred', action: 'More details' },
  warning: { title: 'Are you sure?', action: 'Cancel' },
  info: { title: 'You have a reminder', action: 'More details' }
}

const variants = Object.keys(messages) as ToastVariant[]

const InlineViewport = () => (
  <ToastViewport className="static max-w-none items-start p-0" />
)

const StaticToast = (props: ToastProps) => (
  <ToastProvider>
    <Toast open duration={Infinity} {...props} />
    <InlineViewport />
  </ToastProvider>
)

type ToastDemoProps = Pick<ToastProps, 'variant'> & {
  withAction?: boolean
  withClose?: boolean
}

const ToastDemo = ({
  variant = 'success',
  withAction = false,
  withClose = false
}: ToastDemoProps) => {
  const { title, action } = messages[variant ?? 'success']

  return (
    <StaticToast variant={variant}>
      <ToastTitle>{title}</ToastTitle>
      {withAction && <ToastAction altText={action}>{action}</ToastAction>}
      {withClose && <ToastClose />}
    </StaticToast>
  )
}

const ToastVariants = ({ withAction = false }: { withAction?: boolean }) => (
  <ToastProvider>
    {variants.map(variant => (
      <Toast key={variant} variant={variant} open duration={Infinity}>
        <ToastTitle>{messages[variant].title}</ToastTitle>
        {withAction && (
          <ToastAction altText={messages[variant].action}>
            {messages[variant].action}
          </ToastAction>
        )}
      </Toast>
    ))}
    <InlineViewport />
  </ToastProvider>
)

const ToastTriggerDemo = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <ToastProvider>
      <Button
        onClick={() => {
          setOpen(false)
          window.setTimeout(() => setOpen(true), 100)
        }}
      >
        Save settings
      </Button>
      <Toast variant="success" open={open} onOpenChange={setOpen}>
        <ToastTitle>Your settings have been saved</ToastTitle>
        <ToastAction altText="Undo saving your settings">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

export { ToastDemo, ToastTriggerDemo, ToastVariants }

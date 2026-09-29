import * as React from 'react'

import {
  Button,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/index'
import type { ToastProps, ToastVariant } from '@/index'

const messages: Record<
  ToastVariant,
  { title: string; action: string; altText: string }
> = {
  success: {
    title: 'Your settings have been saved',
    action: 'Undo',
    altText: 'Undo saving your settings'
  },
  error: {
    title: 'An error has occurred',
    action: 'More details',
    altText: 'See more details about the error'
  },
  warning: {
    title: 'Are you sure?',
    action: 'Cancel',
    altText: 'Cancel this action'
  },
  info: {
    title: 'You have a reminder',
    action: 'More details',
    altText: 'See more details about your reminder'
  }
}

const variants = Object.keys(messages) as ToastVariant[]

const InlineViewport = () => (
  <ToastViewport className="static max-w-none items-start p-0" />
)

const DemoLayout = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <div className="flex flex-col items-start gap-6">{children}</div>
  </ToastProvider>
)

const ShowAgain = ({ onClick }: { onClick: () => void }) => (
  <Button variant="secondary" onClick={onClick}>
    Show the toasts again
  </Button>
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
  const [open, setOpen] = React.useState(true)
  const { title, action, altText } = messages[variant ?? 'success']

  return (
    <DemoLayout>
      <Toast
        variant={variant}
        open={open}
        onOpenChange={setOpen}
        duration={Infinity}
      >
        <ToastTitle>{title}</ToastTitle>
        {withAction && <ToastAction altText={altText}>{action}</ToastAction>}
        {withClose && <ToastClose />}
      </Toast>
      <InlineViewport />
      {!open && <ShowAgain onClick={() => setOpen(true)} />}
    </DemoLayout>
  )
}

const ToastVariants = ({ withAction = false }: { withAction?: boolean }) => {
  const [closed, setClosed] = React.useState<ToastVariant[]>([])

  return (
    <DemoLayout>
      {variants.map(variant => (
        <Toast
          key={variant}
          variant={variant}
          open={!closed.includes(variant)}
          onOpenChange={open => {
            if (!open) setClosed(current => [...current, variant])
          }}
          duration={Infinity}
        >
          <ToastTitle>{messages[variant].title}</ToastTitle>
          {withAction && (
            <ToastAction altText={messages[variant].altText}>
              {messages[variant].action}
            </ToastAction>
          )}
        </Toast>
      ))}
      <InlineViewport />
      {closed.length > 0 && <ShowAgain onClick={() => setClosed([])} />}
    </DemoLayout>
  )
}

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

const ToastDescriptionDemo = () => {
  const [open, setOpen] = React.useState(true)

  return (
    <DemoLayout>
      <Toast
        variant="error"
        open={open}
        onOpenChange={setOpen}
        duration={Infinity}
      >
        <ToastTitle>An error has occurred</ToastTitle>
        <ToastDescription>Your changes could not be saved.</ToastDescription>
        <ToastAction altText="Try saving your changes again">
          Try again
        </ToastAction>
        <ToastClose />
      </Toast>
      <InlineViewport />
      {!open && <ShowAgain onClick={() => setOpen(true)} />}
    </DemoLayout>
  )
}

export { ToastDemo, ToastDescriptionDemo, ToastTriggerDemo, ToastVariants }

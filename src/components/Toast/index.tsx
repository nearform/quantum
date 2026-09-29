'use client'

import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'

import {
  BsCheckCircleFill,
  BsExclamationCircleFill,
  BsInfoCircleFill,
  BsQuestionCircleFill,
  BsXLg,
  type IconType
} from '@/assets'
import { cn } from '@/lib/utils'

const focusClasses = [
  'outline-hidden',
  'focus-visible:shadow-brandGreen',
  'dark:focus-visible:shadow-brandGreen10'
]

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed',
      'bottom-0',
      'right-0',
      'z-[100]',
      'flex',
      'max-h-screen',
      'w-full',
      'max-w-md',
      'flex-col',
      'items-end',
      'gap-3',
      'p-4',
      'outline-hidden',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const toastVariants = cva(
  [
    'pointer-events-auto',
    'flex',
    'w-fit',
    'max-w-full',
    'items-center',
    'gap-2',
    'rounded-sm',
    'border',
    'px-2',
    'py-1.5',
    'text-xs',
    'text-foreground',
    'shadow-sm',
    'data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=cancel]:transition-transform',
    'data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x)',
    ...focusClasses
  ],
  {
    variants: {
      variant: {
        success: ['bg-green-50', 'border-feedback-success'],
        error: ['bg-red-50', 'border-feedback-error'],
        warning: ['bg-yellow-50', 'border-feedback-warning'],
        info: ['bg-blue-50', 'border-border', 'dark:bg-background']
      }
    },
    defaultVariants: {
      variant: 'info'
    }
  }
)

type ToastVariant = NonNullable<VariantProps<typeof toastVariants>['variant']>

const toastIcons: Record<ToastVariant, { icon: IconType; className: string }> =
  {
    success: { icon: BsCheckCircleFill, className: 'text-feedback-success' },
    error: { icon: BsExclamationCircleFill, className: 'text-feedback-error' },
    warning: { icon: BsQuestionCircleFill, className: 'text-feedback-danger' },
    info: { icon: BsInfoCircleFill, className: 'text-blue-600' }
  }

interface ToastProps
  extends
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {
  /** Replaces the variant's icon. Pass `null` to show no icon. */
  icon?: React.ReactNode
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant, icon, type, children, ...props }, ref) => {
  const resolved = variant ?? 'info'
  const { icon: Icon, className: iconClassName } = toastIcons[resolved]

  return (
    <ToastPrimitive.Root
      ref={ref}
      type={type ?? (resolved === 'error' ? 'foreground' : 'background')}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      {icon !== null && (
        <span
          aria-hidden="true"
          className={cn(
            'flex',
            'shrink-0',
            'items-center',
            '[&>svg]:h-3',
            '[&>svg]:w-3',
            iconClassName
          )}
        >
          {icon ?? <Icon />}
        </span>
      )}
      {children}
    </ToastPrimitive.Root>
  )
})
Toast.displayName = ToastPrimitive.Root.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('font-medium', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('text-foreground-muted', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'ml-2',
      'shrink-0',
      'cursor-pointer',
      'rounded-xs',
      'font-medium',
      'underline',
      'underline-offset-2',
      'hover:no-underline',
      ...focusClasses,
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitive.Action.displayName

interface ToastCloseProps extends React.ComponentPropsWithoutRef<
  typeof ToastPrimitive.Close
> {
  /** Accessible name for the close button. */
  label?: string
}

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(({ className, label = 'Close', children, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    aria-label={label}
    className={cn(
      'ml-1',
      'flex',
      'h-5',
      'w-5',
      'shrink-0',
      'cursor-pointer',
      'items-center',
      'justify-center',
      'rounded-xs',
      'hover:bg-foreground/10',
      '[&>svg]:h-3',
      '[&>svg]:w-3',
      ...focusClasses,
      className
    )}
    {...props}
  >
    {children ?? <BsXLg aria-hidden="true" />}
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
}
export type { ToastCloseProps, ToastProps, ToastVariant }

'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'

import { BsXLg } from '@/assets'
import { cn } from '@/lib/utils'

const Modal = DialogPrimitive.Root

const ModalTrigger = DialogPrimitive.Trigger

const ModalPortal = DialogPrimitive.Portal

const ModalCloseFooter = DialogPrimitive.Close

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-background/80', className)}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-6 shadow-lg bg-background dark:bg-foreground duration-200 sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = DialogPrimitive.Content.displayName

const headerVariants = cva(
  [
    'flex',
    'items-center',
    'justify-between',
    'p-6',
    'space-y-1.5',
    'text-center',
    'sm:text-left',
    'border-border-subtle',
    'dark:border-border-subtle-dark'
  ],
  {
    variants: {
      variant: {
        default: ['border-b'],
        form: ['pb-0', 'border-b-0']
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const ModalHeader = ({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof headerVariants>) => (
  <div className={cn(headerVariants({ variant, className }))} {...props} />
)

ModalHeader.displayName = 'ModalHeader'

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col p-6 pt-0 gap-2.5', className)} {...props} />
)
ModalFooter.displayName = 'ModalFooter'

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight text-foreground dark:text-foreground-inverse',
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

const ModalClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(
      'rounded-sm opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-foreground-muted',
      className
    )}
    {...props}
  >
    <div className="text-foreground dark:text-foreground-inverse">
      <BsXLg className="w-5 h-5" strokeWidth={0.833} />
    </div>
    <span className="sr-only">Close</span>
  </DialogPrimitive.Close>
))

const descriptionVariants = cva(
  [
    'text-sm',
    'text-foreground-muted',
    'border-border-subtle',
    'dark:border-border-subtle-dark'
  ],
  {
    variants: {
      variant: {
        default: ['border-b'],
        form: ['border-b-0']
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> &
    VariantProps<typeof descriptionVariants>
>(({ className, variant, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(descriptionVariants({ variant, className }))}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalCloseFooter,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription
}

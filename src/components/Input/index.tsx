import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { BsX, BsPersonFill, BsSearch } from '@/assets'

const leftSideVariants = cva(['flex', 'items-center', 'text-inherit'])

const rightSideVariants = cva([
  'flex',
  'items-center',
  'size-6',
  'text-right',
  'justify-end',
  'pb-1'
])

const closeButtonVariant = cva([
  'flex',
  'items-center',
  'justify-middle',
  'size-3'
])

const formVariants = cva(
  [
    'flex',
    'border',
    'border-2',
    'rounded-lg',
    'overflow-hidden',
    'items-center',
    'gap-1.5',
    'pl-3',
    'pr-3',
    '[&:has(:disabled)]:border-none'
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-border-subtle',
          'dark:border-border-subtle-dark',
          'bg-background-alt',
          'dark:bg-background-alt-dark',
          'hover:border-border-hover',
          'hover:focus-within:border-border-focus',
          'dark:hover:focus-within:border-border-focus-dark',
          'focus-within:shadow-blue',
          'text-foreground-muted',
          'dark:text-foreground-muted-dark'
        ],
        error: [
          'border-feedback-red',
          'text-feedback-red',
          'bg-red-50',
          'hover:border-red-700',
          'focus-within:shadow-red'
        ],
        success: [
          'border-feedback-green',
          'text-feedback-green',
          'bg-green-50',
          'hover:border-green-700',
          'focus-within:shadow-green'
        ]
      },
      size: {
        sm: ['h-9.25', 'text-sm'],
        md: ['h-10.5']
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

const inputVariants = cva(
  ['flex', 'flex-grow', 'items-center', 'outline-none', 'bg-transparent'],
  {
    variants: {
      variant: {
        primary: ['text-foreground', 'dark:text-foreground-dark'],
        error: ['text-feedback-red'],
        success: ['text-green-700']
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  variant: 'primary' | 'error' | 'success'
  type: 'text' | 'search'
  size: 'sm' | 'md'
  formClassName?: string
  leftSideClassName?: string
  leftSideChild?: React.ReactNode
  rightSideChild?: React.ReactNode
  onClear: () => void
}

const convertTypeToComponent = {
  left: {
    text: <BsPersonFill />,
    search: <BsSearch />
  }
}

const Input = React.forwardRef<HTMLButtonElement, InputProps>(
  ({
    type,
    className,
    formClassName,
    leftSideClassName,
    variant,
    leftSideChild,
    rightSideChild,
    size,
    onClear,
    ...props
  }) => {
    const leftSideComponent =
      leftSideChild ?? convertTypeToComponent.left[`${type}`]
    const rightSideComponent = rightSideChild ?? (
      <BsX
        className={closeButtonVariant()}
        width={3}
        height={3}
        viewBox="0 0 12 12"
        strokeWidth={0.6}
      />
    )

    return (
      <form className={cn(formVariants({ variant, size }), formClassName)}>
        <div className={cn(leftSideVariants(), leftSideClassName)}>
          {leftSideComponent}
        </div>
        <input
          type="text" //for now only accept text
          className={cn(inputVariants({ variant }), className)}
          {...props}
        />
        <button type="button" onClick={onClear} className={rightSideVariants()}>
          {rightSideComponent}
        </button>
      </form>
    )
  }
)

export { Input, InputProps }

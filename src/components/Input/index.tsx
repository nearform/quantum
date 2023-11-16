import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const formVariants = cva(['flex'], {
  variants: {
    type: {
      text: [],
      date: [],
      search: []
    }
  },
  defaultVariants: {
    type: 'text'
  }
})

const inputVariants = cva(
  [
    'flex',
    'flex-grow',
    'items-center',
    'gap-6',
    'border',
    'border-[1px]',
    'rounded-lg outline-none',
    'py-2',
    'px-3',
    'pl-[34px]'
  ],
  {
    variants: {
      variant: {
        primary: ['border-border-subtle', ' bg-background-alt'],
        secondary: [],
        error: [],
        success: []
      },
      type: {
        text: ['bg-user-icon-light bg-no-repeat bg-[position:12px_50%]'],
        date: [],
        search: []
      }
    },
    defaultVariants: {
      variant: 'primary',
      type: 'text'
    }
  }
)

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  variant: 'primary' | 'secondary' | 'error' | 'success'
  type: 'text' | 'date' | 'search'
  formClassName?: string
}

const Input = ({ type, className, formClassName, variant }: InputProps) => {
  return (
    <form className={cn(formVariants(), formClassName)}>
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
      />
    </form>
  )
}

export { Input, InputProps }

import { cva } from 'class-variance-authority'

/**
 * The closed field of a select: `SelectTrigger`'s button and `NativeSelect`'s
 * `<select>`, so the two look and size alike side by side. Kept out of either
 * component's index so it is shared without becoming public API.
 */
export const triggerVariants = cva(
  [
    [
      'flex',
      'w-full',
      'border border-[2px]',
      'text-foreground',
      'items-center',
      'justify-between',
      'rounded-lg',
      'px-3',
      'py-2',
      'text-sm',
      'focus:outline-hidden',
      'focus-visible:shadow-blue',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      '[&>span]:line-clamp-1'
    ]
  ],
  {
    variants: {
      variant: {
        default: [
          'text-foreground',
          'border-border',
          'bg-grey-100',
          'hover:border-border-hover',
          'dark:hover:border-border-hover-dark',
          'hover:text-foreground',
          'focus-visible:shadow-brandGreen',
          'dark:bg-background-alt-dark',
          'dark:border-border-dark',
          'dark:text-foreground-muted-dark',
          'data-[placeholder]:text-foreground-muted',
          'dark:focus-visible:shadow-brandGreen10'
        ],
        error: [
          'bg-red-50',
          'border-feedback-error',
          'hover:border-red-700',
          'focus-visible:shadow-red',
          'text-red-700',
          'dark:bg-background-alt-dark',
          'dark:border-feedback-error-dark',
          'dark:text-feedback-error-dark'
        ],
        success: [
          'bg-green-50',
          'border-feedback-success',
          'hover:border-green-700',
          'focus-visible:shadow-green',
          'text-green-700',
          'dark:bg-background-alt-dark',
          'dark:border-feedback-success-dark',
          'dark:text-feedback-success-dark'
        ]
      },
      size: {
        sm: ['h-[37px]'],
        lg: ['h-[42px]']
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm'
    }
  }
)

'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-foreground-inverse',
  {
    variants: {
      size: {
        lg: 'text-lg',
        md: 'text-md',
        sm: 'text-sm',
        xs: 'text-xs',
        xl: 'text-xl'
      }
    },
    defaultVariants: {
      size: 'sm'
    }
  }
);

const alignVariants = cva('', {
  variants: {
    align: {
      left: 'text-left',
      right: 'text-right'
    }
  },
  defaultVariants: {
    align: 'left'
  }
});

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  hintText?: string;
  align?: 'left' | 'right';
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, size, hintText, align, ...props }, ref) => {
  const label = (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        labelVariants({ size }),
        alignVariants({ align }),
        className
      )}
      {...props}
    />
  );

  if (hintText) {
    return (
      <div className="flex flex-col">
        {label}
        <div
          className={cn(
            alignVariants({ align }),
            'font-semibold	text-xs text-foreground-muted dark:text-foreground-muted-dark'
          )}
        >
          {hintText}
        </div>
      </div>
    );
  }

  return label;
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, LabelProps };

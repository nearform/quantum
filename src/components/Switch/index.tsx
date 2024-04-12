import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const switchVariants = cva([
  [
    'peer',
    'inline-flex',
    'h-5',
    'py-0.5',
    'w-10',
    'gap-[8px]',
    'shrink-0',
    'cursor-pointer',
    'items-center',
    'rounded-full',
    'border-none',
    'transition-colors ',
    'focus-visible:outline-none',
    'focus-visible:shadow-brandGreen',
    'disabled:cursor-not-allowed'
  ],
  [
    'dark:enabled:data-[state=checked]:bg-accent-dark',
    'dark:enabled:bg-foreground-subtle-dark',
    'dark:disabled:bg-grey-200',
    'dark:focus-visible:shadow-brandGreen-10'
  ],
  [
    'enabled:data-[state=checked]:bg-accent',
    'enabled:bg-foreground-subtle',
    'disabled:bg-grey-200'
  ]
]);

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants(), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn([
        'pointer-events-none',
        'block',
        'h-4',
        'w-4',
        'rounded-full',
        'bg-background',
        'ring-0',
        'transition-transform ',
        'data-[state=checked]:translate-x-[22px]',
        'data-[state=unchecked]:translate-x-[2px]',
        'data-[disabled]:bg-grey-300',
        'dark:bg-black',
        'dark:data-[disabled]:bg-grey-300'
      ])}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

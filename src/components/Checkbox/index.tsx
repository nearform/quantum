import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 gap-0 p-0.5 border rounded data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-foreground-inverse data-[state=indeterminate]:text-red-500',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-inherit')}
    >
      {/* <img src={CheckBoxIcon} /> */}
      <svg
        className="text-inherit stroke-current stroke-1 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="check">
          <path
            className="text-inherit"
            id="Vector"
            d="M9.72648 17.5L9.72217 17.5C9.60611 17.5005 9.4852 17.4519 9.38785 17.3489L4.66647 12.3507C4.66633 12.3506 4.6662 12.3504 4.66607 12.3503C4.6169 12.2978 4.57557 12.233 4.54633 12.1585L4.08221 12.3408L4.54633 12.1585C4.517 12.0838 4.50096 12.0022 4.50004 11.9186C4.49817 11.748 4.55898 11.5911 4.65755 11.481C4.75482 11.3723 4.87789 11.3197 4.99627 11.3182C5.11455 11.3166 5.23805 11.3658 5.33701 11.4712L5.33813 11.4724L9.36492 15.7335L9.72855 16.1183L10.0919 15.7333L18.6614 6.65376L18.662 6.65306C18.7612 6.54761 18.8849 6.4984 19.0033 6.50004C19.1219 6.50168 19.2451 6.55443 19.3425 6.66337C19.4412 6.77376 19.5019 6.93091 19.5 7.10171C19.498 7.27229 19.4337 7.42694 19.3334 7.53385C19.3333 7.53398 19.3332 7.5341 19.3331 7.53423L10.0608 17.3489C9.96345 17.4519 9.84254 17.5005 9.72648 17.5Z"
          />
        </g>
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

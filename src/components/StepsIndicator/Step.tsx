import { BsCircleFill } from '@/assets';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

interface StepProps {
  selected: 'true' | 'false';
  className?: string;
}

const stepVariant = cva([
  'text-inherit',
  'fill-current',
  'text-accent-alt',
  'dark:text-accent-alt-dark',
  'hover:text-foreground-subtle',
  'dark:hover:text-foreground-subtle-dark',
  'active:text-foreground-muted',
  'dark:active:text-foreground-muted-dark',
  'data-[selected=true]:text-secondary-100',
  'dark:data-[selected=true]:text-accent-dark'
]);

const Step = ({ selected, className }: StepProps) => {
  return (
    <BsCircleFill
      size="8"
      data-selected={selected}
      className={cn(stepVariant(), className)}
    />
  );
};

export { Step, type StepProps };

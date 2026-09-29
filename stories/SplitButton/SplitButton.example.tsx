import { SplitButton, SplitButtonItem, SplitButtonSeparator } from '@/index'
import type { SplitButtonProps } from '@/index'

type SplitButtonDemoProps = Omit<SplitButtonProps, 'label' | 'children'> &
  Partial<Pick<SplitButtonProps, 'label'>>

const SplitButtonDemo = ({
  label = 'Save',
  ...props
}: SplitButtonDemoProps) => (
  <SplitButton label={label} menuLabel="More save options" {...props}>
    <SplitButtonItem>Save as draft</SplitButtonItem>
    <SplitButtonItem>Save and close</SplitButtonItem>
    <SplitButtonSeparator />
    <SplitButtonItem disabled>Save as template</SplitButtonItem>
  </SplitButton>
)

const SplitButtonStates = ({ variant }: Pick<SplitButtonProps, 'variant'>) => (
  <div className="flex items-center gap-4">
    <SplitButtonDemo variant={variant} label="Label" />
    <SplitButtonDemo variant={variant} label="Label" disabled />
  </div>
)

export { SplitButtonDemo, SplitButtonStates, type SplitButtonDemoProps }

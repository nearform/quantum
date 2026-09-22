import {
  Input,
  InputProps,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TriggerProps,
  BsPersonFill
} from '@/index'

/**
 * The controls the design file draws a form group around, reduced to the one
 * prop each story actually varies. `Input` needs a handful of props before it
 * renders at all, and repeating them in every story would bury the thing the
 * stories are about.
 *
 * Both of these spread the props they are given straight through, which is
 * the whole contract a control has to meet to work inside a `FormGroup`: the
 * group hands the control its `id`, its `aria-describedby` and its
 * `aria-invalid`, and a wrapper that swallows them leaves the label pointing
 * at an element that does not exist.
 */
export const TextControl = ({
  variant = 'primary',
  ...props
}: Partial<InputProps>) => (
  <Input
    type="text"
    variant={variant}
    placeholder="Text"
    leftSideChild={<BsPersonFill aria-hidden="true" />}
    onClear={() => {}}
    {...props}
  />
)

export const SelectControl = ({ variant, ...props }: TriggerProps) => (
  <Select>
    <SelectTrigger variant={variant} className="w-full" {...props}>
      <SelectValue placeholder="Text" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apples">Apples</SelectItem>
      <SelectItem value="oranges">Oranges</SelectItem>
    </SelectContent>
  </Select>
)

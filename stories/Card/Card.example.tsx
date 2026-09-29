import {
  Card,
  CardDescription,
  CardTitle,
  SelectableCard,
  SwitchCard
} from '@/index'
import type { CardProps } from '@/index'

const description =
  'This is an example of a card that is selectable via clicking on the checkbox, or the card itself.'

const CardDemo = (props: CardProps) => (
  <Card className="w-72 text-center" {...props}>
    <CardTitle>Heading</CardTitle>
    <CardDescription>Description</CardDescription>
  </Card>
)

const FilledCardDemo = () => (
  <Card
    variant="filled"
    className="flex h-36 w-72 items-center justify-center text-center text-xs font-medium"
  >
    Replace this component with your content
  </Card>
)

const SelectableCardDemo = () => (
  <div className="flex w-72 flex-col gap-3">
    <SelectableCard title="Header" description={description} />
    <SelectableCard title="Header" description={description} defaultChecked />
    <SelectableCard title="Header" description={description} disabled />
  </div>
)

const SwitchCardDemo = () => (
  <div className="flex w-72 flex-col gap-3">
    <SwitchCard label="Label" onRemove={() => {}} removeLabel="Remove label" />
    <SwitchCard
      label="Label"
      defaultChecked
      onRemove={() => {}}
      removeLabel="Remove label"
    />
    <SwitchCard label="Label" />
  </div>
)

const CardStates = () => (
  <div className="flex flex-col gap-3">
    <CardDemo />
    <CardDemo interactive />
    <CardDemo selected />
  </div>
)

export {
  CardDemo,
  CardStates,
  FilledCardDemo,
  SelectableCardDemo,
  SwitchCardDemo
}

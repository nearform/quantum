import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverSeparator,
  PopoverProps
} from '@/components/Popover'
import { Button, Label, PlusIcon, Radio, RadioGroup } from '@/index'

const RadioWithLabel = ({ value }: { value: string }) => {
  return (
    <div className="flex space-x-1">
      <Radio value={value} />
      <Label htmlFor={value}>{value}</Label>
    </div>
  )
}

const PopoverDemoRadio = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Open Options</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="font-semibold">
          How often would you like to recieve notifications?
        </div>
        <PopoverSeparator />
        <RadioGroup className="flex flex-col gap-4 my-2" defaultValue="Never">
          <RadioWithLabel value="Daily"></RadioWithLabel>
          <RadioWithLabel value="Weekly"></RadioWithLabel>
          <RadioWithLabel value="Monthly"></RadioWithLabel>
          <RadioWithLabel value="Never"></RadioWithLabel>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}
const PopoverDemoList = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Open Shopping List</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex font-semibold justify-center">Shopping List</div>
        <PopoverSeparator/>
        <li>Bananas</li>
        <li>Bread</li>
        <li>Butter</li>
        <li>Sugar</li>
        <li>Icing Sugar</li>
        <li>Eggs</li>
        <li>Baking Powder</li>
        <PopoverSeparator />
        <div className="flex items-center gap-2 font-semibold">
          <PlusIcon className="stroke-current" />
          Add new item
        </div>
      </PopoverContent>
    </Popover>
  )
}
const PopoverDemoScrollableList = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Open Shopping List</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 h-60">
        <div className="flex font-semibold justify-center">Shopping List</div>
        <PopoverSeparator />
        <li>Bananas</li>
        <li>Bread</li>
        <li>Butter</li>
        <li>Sugar</li>
        <li>Icing Sugar</li>
        <li>Eggs</li>
        <li>Baking Powder</li>
        <PopoverSeparator />
        <div className="flex items-center gap-2 font-semibold">
          <PlusIcon className="stroke-current" />
          Add new item
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface DemoProps extends PopoverProps {
  example: string
}

const PopoverDemo = ({ example }: DemoProps) => {
  return (
    <>
      {example === 'list' && <PopoverDemoList />}
      {example === 'radio' && <PopoverDemoRadio />}
      {example === 'scrollableList' && <PopoverDemoScrollableList />}
    </>
  )
}

export { PopoverDemo }

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverSeparator,
  PopoverClose,
  PopoverProps
} from '@/components/Popover'
import { Button, Label, Radio, RadioGroup } from '@/index'
import { BsPlus } from '@/assets'

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
        <div className="flex flex-col gap-3 px-4">
          <div className="font-semibold pt-2">
            How often would you like to recieve notifications?
          </div>
          <PopoverSeparator className="-mx-4" />
          <RadioGroup
            className="flex flex-col gap-4 my-2 pb-2"
            defaultValue="Never"
          >
            <RadioWithLabel value="Daily"></RadioWithLabel>
            <RadioWithLabel value="Weekly"></RadioWithLabel>
            <RadioWithLabel value="Monthly"></RadioWithLabel>
            <RadioWithLabel value="Never"></RadioWithLabel>
          </RadioGroup>
        </div>
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
        <div className="flex flex-col gap-3 px-4">
          <div className="flex font-semibold justify-center pt-2">
            Shopping List
          </div>
          <PopoverSeparator className="-mx-4" />
          <li>Bananas</li>
          <li>Bread</li>
          <li>Butter</li>
          <li>Sugar</li>
          <li>Icing Sugar</li>
          <li>Eggs</li>
          <li>Baking Powder</li>
          <PopoverSeparator className="-mx-4" />
          <div className="flex items-center gap-2 font-semibold pb-2">
            <BsPlus className="stroke-current" />
            Add new item
          </div>
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
        <div className="flex flex-col gap-3 px-4">
          <div className="flex font-semibold justify-center pt-2">
            Shopping List
          </div>
          <PopoverSeparator className="-mx-4" />
          <li>Bananas</li>
          <li>Bread</li>
          <li>Butter</li>
          <li>Sugar</li>
          <li>Icing Sugar</li>
          <li>Eggs</li>
          <li>Baking Powder</li>
          <PopoverSeparator className="-mx-4" />
          <div className="flex items-center gap-2 font-semibold pb-2">
            <BsPlus className="stroke-current" />
            Add new item
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const PopoverDemoWithCloseButton = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 h-30 p-5">
        <div className="flex flex-col">
          <div className="font-semibold pt-2">
            Press the button below to close the popover
          </div>
          <PopoverClose className="justify-center items-center">
            <Button>Close Popover</Button>
          </PopoverClose>
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
      {example === 'popoverClose' && <PopoverDemoWithCloseButton />}
    </>
  )
}

export { PopoverDemo }

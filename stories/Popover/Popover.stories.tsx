import type { Meta, StoryObj } from '@storybook/react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
  PopoverFooter,
  PopoverScrollArea,
  PopoverHeader
} from '@/components/Popover'

import { Button, Radio, RadioGroup, ControlLabel } from '@/index'

import { ChevronLeftOutlineIcon } from '@/assets'

const items = [
  { label: 'First action' },
  { label: 'Second action' },
  { label: 'Third action' },
  { label: 'Fourth action' },
  { label: 'Fifth action' },
  { label: 'Sixth action' },
  { label: 'Seventh action' },
  { label: 'Eighth action' }
]

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: props => (
    <Popover {...props}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <ul className="list-none space-y-4 pb-4">
          {items.map(({ label }) => (
            <li className="cursor-pointer">{label}</li>
          ))}
        </ul>
        <PopoverFooter>
          <Button
            leftSideChild={<ChevronLeftOutlineIcon />}
            variant="tertiary"
            className="font-semibold"
          >
            Sign out
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export const IconList: Story = {
  render: props => (
    <Popover {...props}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverScrollArea className="h-60">
          <ul className="list-none space-y-4 pb-4">
            {items.map(({ label }) => (
              <li className="cursor-pointer flex items-center">
                <ChevronLeftOutlineIcon className="h-1.5 w-1.5" />
                <span className="ml-2">{label}</span>
              </li>
            ))}
          </ul>
        </PopoverScrollArea>
        <PopoverFooter>
          <Button
            leftSideChild={<ChevronLeftOutlineIcon />}
            variant="tertiary"
            className="font-semibold"
          >
            Sign out
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export const WithHeader: Story = {
  render: props => (
    <Popover {...props}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader header="Name" subHeader="Name@email.com" />
        <ul className="list-none space-y-4 py-4">
          {items.slice(0, 3).map(({ label }) => (
            <li className="cursor-pointer">{label}</li>
          ))}
        </ul>
        <PopoverFooter>
          <Button
            leftSideChild={<ChevronLeftOutlineIcon />}
            variant="tertiary"
            className="font-semibold"
          >
            Sign out
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export const RadioList: Story = {
  render: props => (
    <Popover {...props}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <RadioGroup className="flex flex-col gap-4" defaultValue="option2">
          <ControlLabel htmlFor="option1" label="Unchecked and label">
            <Radio id="option1" value="option1" />
          </ControlLabel>
          <ControlLabel htmlFor="option2" label="Checked and label">
            <Radio id="option2" value="option2" />
          </ControlLabel>
          <ControlLabel
            htmlFor="option3"
            label="With label and hint"
            hintText="This is a hint"
          >
            <Radio id="option3" value="option3" />
          </ControlLabel>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}

export const CloseButton: Story = {
  render: props => (
    <Popover {...props}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="">
        <div className="flex flex-col items-center">
          <div className="font-semibold mb-8">
            Press the button below to close the popover
          </div>
          <PopoverClose>
            <Button>Close Popover</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// type LinkToExampleProps = React.PropsWithChildren<{ i: number }>

// function ListItem({ children, i }: LinkToExampleProps) {
//   return (
//     <li>
//       <a
//         href={`https://www.example.com/${i}`}
//         target="_blank"
//         className="hover:text-blue-800 visited:text-purple-600"
//       >
//         {children}
//       </a>
//     </li>
//   )
// }

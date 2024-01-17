import type { Meta, StoryObj } from '@storybook/react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverFooter,
  PopoverScrollArea,
  PopoverHeader
} from '@/components/Popover'

import {
  Button,
  Radio,
  RadioGroup,
  ControlLabel,
  Link,
  Checkbox
} from '@/index'

import { BsBoxArrowLeft } from '@/assets'

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
        <div className="space-y-1 pb-1">
          {items.map(({ label }) => (
            <Link>{label}</Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const HeaderFooterAndScrollingContent: Story = {
  render: props => (
    <Popover {...props}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader header="Name" subHeader="Name@email.com" />
        <PopoverScrollArea className="h-40">
          <div className="space-y-1 pb-1">
            {items.map(({ label }) => (
              <Link>{label}</Link>
            ))}
          </div>
        </PopoverScrollArea>
        <PopoverFooter>
          <Link icon={BsBoxArrowLeft}>Sign out</Link>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export const WithCheckboxes: Story = {
  render: props => (
    <Popover {...props}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col space-y-4 pl-2 py-2">
          <ControlLabel htmlFor="option1" label="Unchecked and label">
            <Checkbox id="option1" value="option1" />
          </ControlLabel>
          <ControlLabel htmlFor="option2" label="Checked and label">
            <Checkbox id="option2" value="option2" checked={true} />
          </ControlLabel>
          <ControlLabel htmlFor="option3" label="With label and hint">
            <Checkbox id="option3" value="option3" />
          </ControlLabel>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const WithRadioGroup: Story = {
  render: props => (
    <Popover {...props}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <RadioGroup
          className="flex flex-col space-y-4 pl-2 py-2"
          defaultValue="option2"
        >
          <ControlLabel htmlFor="option1" label="Unchecked and label">
            <Radio id="option1" value="option1" />
          </ControlLabel>
          <ControlLabel htmlFor="option2" label="Checked and label">
            <Radio id="option2" value="option2" />
          </ControlLabel>
          <ControlLabel htmlFor="option3" label="With label and hint">
            <Radio id="option3" value="option3" />
          </ControlLabel>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}

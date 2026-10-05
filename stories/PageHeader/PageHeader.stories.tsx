import type { Meta, StoryObj } from '@storybook/react-vite'

import { BsThreeDots } from '@/assets'
import {
  BackLink,
  IconButton,
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SortAndShowControl
} from '@/index'

const sortOptions = [
  { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
  { value: 'reverse-alphabetical', label: 'Alphabetical (Z-A)' },
  { value: 'newest', label: 'Newest first' }
]

const showOptions = ['10', '20', '50', '100'].map(value => ({
  value,
  label: value
}))

const SortAndShowControls = () => (
  <>
    <SortAndShowControl
      label="Sort by"
      options={sortOptions}
      defaultValue="alphabetical"
    />
    <SortAndShowControl label="Show" options={showOptions} defaultValue="20" />
  </>
)

const MoreOptions = () => (
  <Popover>
    <PopoverTrigger asChild>
      <IconButton
        icon={<BsThreeDots />}
        label="Sort and show options"
        variant="tertiary"
        size="xs"
      />
    </PopoverTrigger>
    <PopoverContent align="end" className="min-w-0">
      <div className="flex flex-col items-start gap-3">
        <SortAndShowControls />
      </div>
    </PopoverContent>
  </Popover>
)

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded'
  },
  args: {
    size: 'md'
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'sm'] }
  },
  decorators: [
    Story => (
      <div className="rounded-lg bg-background-alt p-6 dark:bg-background-alt-dark">
        <Story />
      </div>
    )
  ],
  render: args => (
    <PageHeader {...args}>
      <PageHeaderTitle count="216 Results">Projects</PageHeaderTitle>
      <PageHeaderActions>
        {args.size === 'sm' ? <MoreOptions /> : <SortAndShowControls />}
      </PageHeaderActions>
    </PageHeader>
  )
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithBackLink: Story = {
  render: args => (
    <PageHeader {...args}>
      <BackLink href="#" size={args.size === 'sm' ? 'sm' : 'md'} />
      <PageHeaderActions>
        {args.size === 'sm' ? <MoreOptions /> : <SortAndShowControls />}
      </PageHeaderActions>
    </PageHeader>
  )
}

export const Mobile: Story = {
  args: {
    size: 'sm'
  },
  decorators: [
    Story => (
      <div className="max-w-sm">
        <Story />
      </div>
    )
  ]
}

export const MobileWithBackLink: Story = {
  ...WithBackLink,
  args: {
    size: 'sm'
  },
  decorators: Mobile.decorators
}

export const DarkMode: Story = {
  ...Default,
  name: 'Dark mode',
  globals: { theme: 'dark' }
}

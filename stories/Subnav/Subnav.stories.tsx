import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Subnav,
  SubnavHeading,
  SubnavItem,
  SubnavLink,
  SubnavList
} from '@/index'

const meta = {
  title: 'Components/Subnav',
  component: Subnav,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Subnav>

export default meta
type Story = StoryObj<typeof meta>

const links = [
  'Overview',
  'Getting started',
  'Installation',
  'Theming',
  'Dark mode',
  'Accessibility',
  'Changelog'
]

export const Default: Story = {
  render: args => (
    <Subnav className="w-52 px-6 py-8" {...args}>
      <SubnavHeading>Sub nav heading</SubnavHeading>
      <SubnavList>
        {links.map(link => (
          <SubnavItem key={link}>
            <SubnavLink href="#">{link}</SubnavLink>
          </SubnavItem>
        ))}
      </SubnavList>
    </Subnav>
  )
}

export const WithActiveLink: Story = {
  render: args => (
    <Subnav className="w-52 px-6 py-8" {...args}>
      <SubnavHeading>Sub nav heading</SubnavHeading>
      <SubnavList>
        {links.map((link, index) => (
          <SubnavItem key={link}>
            <SubnavLink href="#" active={index === 2}>
              {link}
            </SubnavLink>
          </SubnavItem>
        ))}
      </SubnavList>
    </Subnav>
  )
}

export const WithoutHeading: Story = {
  args: {
    'aria-label': 'Documentation'
  },
  render: args => (
    <Subnav className="w-52 px-6 py-8" {...args}>
      <SubnavList>
        {links.slice(0, 4).map(link => (
          <SubnavItem key={link}>
            <SubnavLink href="#">{link}</SubnavLink>
          </SubnavItem>
        ))}
      </SubnavList>
    </Subnav>
  )
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Navigation, NavigationLink } from '@/index'

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

const links = ['General', 'Members', 'Plans', 'Billing']

export const Default: Story = {
  render: args => (
    <Navigation aria-label="Settings" {...args}>
      {links.map(link => (
        <NavigationLink key={link} href="#">
          {link}
        </NavigationLink>
      ))}
    </Navigation>
  )
}

export const WithActiveLink: Story = {
  render: args => (
    <Navigation aria-label="Settings" {...args}>
      {links.map((link, index) => (
        <NavigationLink key={link} href="#" active={index === 0}>
          {link}
        </NavigationLink>
      ))}
    </Navigation>
  )
}

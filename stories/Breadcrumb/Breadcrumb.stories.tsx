import type { Meta, StoryObj } from '@storybook/react-vite'

import { BsHouse } from '@/assets'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/index'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" icon={BsHouse}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Navigation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Links</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export const WithoutIcon: Story = {
  render: args => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export const CustomSeparator: Story = {
  render: args => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

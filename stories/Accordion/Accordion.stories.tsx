import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    type: {
      options: ['single', 'multiple'],
      control: 'radio'
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'radio'
    }
  },
  render: props => (
    <Accordion {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          facilisis ac ligula ut luctus. Nulla sed tortor tempor, auctor mi at,
          mollis nulla.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>
          <div className="px-6 text-foreground bg-brandGreen-50 dark:bg-brandGreen-100 h-40 font-semibold items-center flex justify-center">
            Replace this component with your content
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Item 3</AccordionTrigger>
        <AccordionContent>
          <div className="px-6 text-foreground bg-brandGreen-50 dark:bg-brandGreen-100 h-40 font-semibold items-center flex justify-center">
            Replace this component with your content
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    type: 'single',
    collapsible: true,
    size: 'md'
  }
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
    size: 'md'
  }
}

export const Sidebar: Story = {
  args: {
    type: 'single',
    collapsible: true,
    size: 'md',
    className: 'w-[206px]'
  }
}

export const HeadingLevel: Story = {
  args: {
    type: 'single',
    collapsible: true,
    size: 'md'
  },
  render: props => (
    <section>
      <h1 className="text-xl font-semibold mb-4 dark:text-white">Settings</h1>
      <Accordion {...props}>
        <AccordionItem value="notifications">
          <AccordionTrigger headingLevel={2}>Notifications</AccordionTrigger>
          <AccordionContent>Choose how you hear from us.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="privacy">
          <AccordionTrigger headingLevel={2}>Privacy</AccordionTrigger>
          <AccordionContent>Control who can see your profile.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

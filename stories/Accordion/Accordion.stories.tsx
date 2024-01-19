import type { Meta, StoryObj } from '@storybook/react'

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
    layout: 'centered'
  },
  argTypes: {
    type: {
      options: ['single', 'multiple'],
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

      <AccordionItem value="item-2" className="">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>
          <div className="text-sm px-6 text-foreground-muted bg-blue-50 dark:bg-blue-900 dark:text-foreground-inverse h-40 font-semibold items-center flex justify-center">
            Replace this component with your content
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Item 3</AccordionTrigger>
        <AccordionContent>
          <div className="bg-blue-50 dark:bg-blue-900 dark:text-foreground-inverse h-40 font-semibold items-center flex justify-center text-sm px-6 text-foreground-muted">
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
    collapsible: true
  }
}

export const Multiple: Story = {
  args: {
    type: 'multiple'
  }
}

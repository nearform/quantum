import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent
} from '@/components/Accordion'

export const AccordionDemo = () => (
  <Accordion type="single" defaultValue="item-1" collapsible>
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
        <div className="text-sm px-6 text-foreground-muted bg-blue-50 dark:bg-blue-900 dark:text-foreground-inverse h-40 text-lg font-semibold items-center flex justify-center">
          Replace this component with your content
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>Item 3</AccordionTrigger>
      <AccordionContent>
        <div className="bg-blue-50 dark:bg-blue-900 dark:text-foreground-inverse h-40 text-lg font-semibold items-center flex justify-center text-sm px-6 text-foreground-muted">
          Replace this component with your content
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

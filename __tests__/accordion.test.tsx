import { describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../src/components/Accordion'

const render = (trigger: React.ReactElement) =>
  renderToStaticMarkup(
    <Accordion type="single" collapsible>
      <AccordionItem value="a">
        {trigger}
        <AccordionContent>Body</AccordionContent>
      </AccordionItem>
    </Accordion>
  )

const classOf = (html: string, tag: string) =>
  html.match(new RegExp(`<${tag}[^>]*class="([^"]*)"`))?.[1] ?? ''

describe('Accordion', () => {
  it('fills its container instead of a fixed width', () => {
    const rootClasses = classOf(
      render(<AccordionTrigger>Title</AccordionTrigger>),
      'div'
    )

    expect(rootClasses).toContain('w-full')
    expect(rootClasses).not.toContain('w-[206px]')
  })

  it('renders the trigger inside an h3 by default', () => {
    const html = render(<AccordionTrigger>Title</AccordionTrigger>)

    expect(html).toMatch(/<h3[^>]*><button/)
  })

  it.each([1, 2, 3, 4, 5, 6] as const)(
    'renders the trigger inside an h%i when headingLevel is set',
    level => {
      const html = render(
        <AccordionTrigger headingLevel={level}>Title</AccordionTrigger>
      )

      expect(html).toMatch(new RegExp(`<h${level}[^>]*><button`))
      expect(html.match(/<h[1-6]/g)).toHaveLength(1)
    }
  )

  it('keeps the header styling and Radix state on the chosen heading', () => {
    const html = render(
      <AccordionTrigger headingLevel={2}>Title</AccordionTrigger>
    )
    const heading = html.match(/<h2[^>]*>/)![0]

    expect(heading).toContain('font-semibold')
    expect(heading).toContain('data-state="closed"')
  })

  it('does not clip the trigger focus ring on the item', () => {
    const html = render(<AccordionTrigger>Title</AccordionTrigger>)
    const itemClasses = html.match(/<div[^>]*class="([^"]*)"/g)![1]
    const triggerClasses = classOf(html, 'button')

    expect(itemClasses).not.toContain('overflow-hidden')
    expect(triggerClasses).toContain('focus-visible:shadow-brandGreen')
    expect(triggerClasses).toContain('focus-visible:z-10')
  })
})

import { describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger
} from '../src/components/Accordion'
import { Avatar } from '../src/components/Avatar'
import { ButtonGroup } from '../src/components/ButtonGroup'
import { Checkbox } from '../src/components/Checkbox'
import { Chip } from '../src/components/Chip'
import { ControlLabel } from '../src/components/ControlLabel'
import { Input } from '../src/components/Input'
import { Link } from '../src/components/Link'
import { Pagination } from '../src/components/Pagination'
import { Password } from '../src/components/Password'
import { RadioGroup, Radio } from '../src/components/Radio'
import { StepsIndicator } from '../src/components/StepsIndicator'
import { Table, TableBody, TableCell, TableRow } from '../src/components/Table'
import { Textarea } from '../src/components/Textarea'
import { FooterStatement, WebsiteFooter } from '../src/components/WebsiteFooter'

const openingTag = (html: string, tag: string, marker = '') => {
  const tags = html.match(new RegExp(`<${tag}\\b[^>]*>`, 'g')) ?? []
  const match = tags.find(candidate => candidate.includes(marker))
  if (!match) {
    throw new Error(`no <${tag}> matching ${JSON.stringify(marker)} in ${html}`)
  }
  return match
}

const openingTags = (html: string, tag: string) =>
  html.match(new RegExp(`<${tag}\\b[^>]*>`, 'g')) ?? []

const attribute = (tag: string, name: string) =>
  tag
    .match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')

describe('Input accessibility', () => {
  it('gives the icon-only clear button an accessible name', () => {
    const html = renderToStaticMarkup(
      <Input type="text" variant="primary" onClear={() => {}} />
    )

    expect(attribute(openingTag(html, 'button'), 'aria-label')).toBe(
      'Clear input'
    )
  })

  it('lets the clear button be renamed for its context', () => {
    const html = renderToStaticMarkup(
      <Input
        type="search"
        variant="primary"
        clearLabel="Clear search"
        onClear={() => {}}
      />
    )

    expect(attribute(openingTag(html, 'button'), 'aria-label')).toBe(
      'Clear search'
    )
  })

  it('associates its label with the field when no id is supplied', () => {
    const html = renderToStaticMarkup(
      <Input
        type="text"
        variant="primary"
        labelText="Full name"
        onClear={() => {}}
      />
    )

    const labelFor = attribute(openingTag(html, 'label'), 'for')
    expect(labelFor).toBeTruthy()
    expect(attribute(openingTag(html, 'input'), 'id')).toBe(labelFor)
  })

  it('describes the field with its help text rather than naming it', () => {
    const html = renderToStaticMarkup(
      <Input
        type="text"
        variant="primary"
        id="email"
        helpText="We never share it"
        onClear={() => {}}
      />
    )

    const input = openingTag(html, 'input')
    expect(attribute(input, 'aria-describedby')).toBe('email-helptext')
    expect(attribute(input, 'aria-labelledby')).toBeUndefined()
    expect(html).toContain('id="email-helptext"')
  })

  it('keeps a caller-supplied description alongside its own', () => {
    const html = renderToStaticMarkup(
      <Input
        type="text"
        variant="primary"
        id="email"
        helpText="We never share it"
        aria-describedby="policy"
        onClear={() => {}}
      />
    )

    expect(attribute(openingTag(html, 'input'), 'aria-describedby')).toBe(
      'policy email-helptext'
    )
  })

  it('does not nest the clear button inside a label element', () => {
    const html = renderToStaticMarkup(
      <Input type="text" variant="primary" onClear={() => {}} />
    )

    expect(html).not.toContain('<label')
  })
})

describe('Password accessibility', () => {
  it('names the mask toggle and reports its state', () => {
    const html = renderToStaticMarkup(<Password />)

    const toggle = openingTag(html, 'button')
    expect(attribute(toggle, 'aria-label')).toBe('Show password')
    expect(attribute(toggle, 'aria-pressed')).toBe('false')
  })

  it('associates its label with the field when no id is supplied', () => {
    const html = renderToStaticMarkup(<Password labelText="Password" />)

    const labelFor = attribute(openingTag(html, 'label'), 'for')
    expect(labelFor).toBeTruthy()
    expect(attribute(openingTag(html, 'input'), 'id')).toBe(labelFor)
  })
})

describe('Textarea accessibility', () => {
  it('associates its label with the field when no id is supplied', () => {
    const html = renderToStaticMarkup(
      <Textarea variant="primary" labelText="Message" />
    )

    const labelFor = attribute(openingTag(html, 'label'), 'for')
    expect(labelFor).toBeTruthy()
    expect(attribute(openingTag(html, 'textarea'), 'id')).toBe(labelFor)
  })

  it('describes the field with its help text rather than naming it', () => {
    const html = renderToStaticMarkup(
      <Textarea
        variant="primary"
        id="bio"
        labelText="Bio"
        helpText="Up to 200 characters"
      />
    )

    const textarea = openingTag(html, 'textarea')
    expect(attribute(textarea, 'aria-describedby')).toBe('bio-helptext')
    expect(attribute(textarea, 'aria-labelledby')).toBeUndefined()
  })
})

describe('Chip accessibility', () => {
  it('does not submit the form it sits in', () => {
    const html = renderToStaticMarkup(<Chip>Filter</Chip>)

    expect(attribute(openingTag(html, 'button'), 'type')).toBe('button')
  })

  it('reports its pressed state only when it has one', () => {
    const plain = openingTag(
      renderToStaticMarkup(<Chip>Filter</Chip>),
      'button'
    )
    const off = openingTag(
      renderToStaticMarkup(<Chip active={false}>Filter</Chip>),
      'button'
    )
    const on = openingTag(
      renderToStaticMarkup(<Chip active>Filter</Chip>),
      'button'
    )

    expect(attribute(plain, 'aria-pressed')).toBeUndefined()
    expect(attribute(off, 'aria-pressed')).toBe('false')
    expect(attribute(on, 'aria-pressed')).toBe('true')
  })

  it('marks itself active only while it is active', () => {
    const off = openingTag(
      renderToStaticMarkup(<Chip active={false}>Filter</Chip>),
      'button'
    )
    const on = openingTag(
      renderToStaticMarkup(<Chip active>Filter</Chip>),
      'button'
    )

    expect(attribute(off, 'data-active')).toBeUndefined()
    expect(attribute(on, 'data-active')).toBe('true')
  })

  it('hides its decorative icon from assistive technology', () => {
    const html = renderToStaticMarkup(<Chip>Filter</Chip>)

    expect(html).toContain('aria-hidden="true"')
  })
})

describe('Link accessibility', () => {
  it('marks the selected link as the current page', () => {
    const html = renderToStaticMarkup(
      <Link href="/here" selected>
        Here
      </Link>
    )

    expect(attribute(openingTag(html, 'a'), 'aria-current')).toBe('page')
  })

  it('leaves aria-current off an unselected link', () => {
    const html = renderToStaticMarkup(<Link href="/there">There</Link>)

    expect(attribute(openingTag(html, 'a'), 'aria-current')).toBeUndefined()
  })

  it('lets the caller override the kind of current item', () => {
    const html = renderToStaticMarkup(
      <Link href="/step" selected aria-current="step">
        Step
      </Link>
    )

    expect(attribute(openingTag(html, 'a'), 'aria-current')).toBe('step')
  })

  it('keeps a focus indicator on the selected link', () => {
    const html = renderToStaticMarkup(
      <Link href="/here" selected>
        Here
      </Link>
    )

    expect(attribute(openingTag(html, 'a'), 'class')).toContain(
      'focus:shadow-brandGreen'
    )
  })
})

describe('Pagination accessibility', () => {
  const html = renderToStaticMarkup(
    <Pagination
      currentPage={2}
      setCurrentPage={() => {}}
      numberOfItemsPerPage={10}
      totalNumberOfFilteredItems={50}
    />
  )

  it('names the navigation landmark', () => {
    expect(attribute(openingTag(html, 'nav'), 'aria-label')).toBe('Pagination')
  })

  it('names the icon-only page-stepping buttons', () => {
    const labels = openingTags(html, 'button').map(tag =>
      attribute(tag, 'aria-label')
    )

    expect(labels[0]).toBe('Go to previous page')
    expect(labels[labels.length - 1]).toBe('Go to next page')
  })

  it('names each page button by the page it goes to', () => {
    const labels = openingTags(html, 'button').map(tag =>
      attribute(tag, 'aria-label')
    )

    expect(labels).toContain('Go to page 1')
    expect(labels).toContain('Go to page 5')
  })

  it('marks the page being viewed as the current one', () => {
    const current = openingTags(html, 'button').filter(
      tag => attribute(tag, 'aria-current') === 'page'
    )

    expect(current).toHaveLength(1)
    expect(attribute(current[0], 'aria-label')).toBe('Go to page 2')
  })

  it('never makes a page button submit the form it sits in', () => {
    const types = openingTags(html, 'button').map(tag => attribute(tag, 'type'))

    expect(types.every(type => type === 'button')).toBe(true)
  })

  it('puts only list items directly inside its list', () => {
    const list = html.slice(html.indexOf('<ul'), html.indexOf('</ul>'))

    expect(list).not.toMatch(/<ul[^>]*>\s*<div/)
    expect(list).not.toMatch(/<\/li>\s*<div/)
  })
})

describe('StepsIndicator accessibility', () => {
  const html = renderToStaticMarkup(
    <StepsIndicator length={4} selectedIndex={1} />
  )

  it('exposes the dots as one named group', () => {
    const group = openingTag(html, 'div', 'role="group"')

    expect(attribute(group, 'aria-label')).toBe('Progress')
  })

  it('names each step by its position in the sequence', () => {
    const labels = openingTags(html, 'button').map(tag =>
      attribute(tag, 'aria-label')
    )

    expect(labels).toEqual([
      'Step 1 of 4',
      'Step 2 of 4',
      'Step 3 of 4',
      'Step 4 of 4'
    ])
  })

  it('marks the selected step beyond its colour alone', () => {
    const current = openingTags(html, 'button').filter(
      tag => attribute(tag, 'aria-current') === 'step'
    )

    expect(current).toHaveLength(1)
    expect(attribute(current[0], 'aria-label')).toBe('Step 2 of 4')
  })

  it('keeps a focus indicator on each step', () => {
    expect(attribute(openingTag(html, 'button'), 'class')).toContain(
      'focus-visible:outline-2'
    )
  })
})

describe('Table accessibility', () => {
  it('makes its scrolling container reachable by keyboard', () => {
    const html = renderToStaticMarkup(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(attribute(openingTag(html, 'div'), 'tabindex')).toBe('0')
  })
})

describe('WebsiteFooter accessibility', () => {
  it('renders the contentinfo landmark', () => {
    const html = renderToStaticMarkup(<WebsiteFooter>Footer</WebsiteFooter>)

    expect(html).toContain('<footer')
  })

  // `foreground-subtle` is 4.39:1 on `background-alt`, and the footer does not
  // set its own surface — a consumer picks it — so the statement takes the
  // token that clears AA on all of them. See __tests__/contrast.test.ts.
  it('sets its statement in a body-text colour', () => {
    const html = renderToStaticMarkup(
      <FooterStatement>© Quantum</FooterStatement>
    )
    const classes = attribute(openingTag(html, 'div', 'text-'), 'class') ?? ''

    expect(classes).toContain('text-foreground-muted')
    expect(classes).toContain('dark:text-foreground-muted-dark')
    expect(classes).not.toContain('text-foreground-subtle')
  })
})

describe('ControlLabel accessibility', () => {
  it('associates the label with an unidentified control', () => {
    const html = renderToStaticMarkup(
      <ControlLabel label="Notify me">
        <Checkbox />
      </ControlLabel>
    )

    const labelFor = attribute(openingTag(html, 'label'), 'for')
    expect(labelFor).toBeTruthy()
    expect(attribute(openingTag(html, 'button'), 'id')).toBe(labelFor)
  })

  it('keeps the id the control already had', () => {
    const html = renderToStaticMarkup(
      <ControlLabel label="Notify me">
        <Checkbox id="notify" />
      </ControlLabel>
    )

    expect(attribute(openingTag(html, 'label'), 'for')).toBe('notify')
    expect(attribute(openingTag(html, 'button'), 'id')).toBe('notify')
  })

  it('defers to an explicit htmlFor', () => {
    const html = renderToStaticMarkup(
      <ControlLabel label="Notify me" htmlFor="elsewhere">
        <Checkbox id="elsewhere" />
      </ControlLabel>
    )

    expect(attribute(openingTag(html, 'label'), 'for')).toBe('elsewhere')
  })
})

describe('focus indicators', () => {
  it('draws one on the checkbox', () => {
    const html = renderToStaticMarkup(<Checkbox />)

    expect(attribute(openingTag(html, 'button'), 'class')).toContain(
      'focus-visible:shadow-brandGreen'
    )
  })

  it('draws one on each radio', () => {
    const html = renderToStaticMarkup(
      <RadioGroup>
        <Radio value="one" />
      </RadioGroup>
    )

    expect(attribute(openingTag(html, 'button'), 'class')).toContain(
      'focus-visible:shadow-brandGreen'
    )
  })

  it('draws one on the accordion trigger', () => {
    const html = renderToStaticMarkup(
      <Accordion type="single" collapsible>
        <AccordionItem value="one">
          <AccordionTrigger>Section</AccordionTrigger>
        </AccordionItem>
      </Accordion>
    )

    expect(attribute(openingTag(html, 'button'), 'class')).toContain(
      'focus-visible:shadow-brandGreen'
    )
  })

  it('replaces the one the button group suppresses', () => {
    const html = renderToStaticMarkup(<ButtonGroup>{null}</ButtonGroup>)
    const classes = attribute(openingTag(html, 'div'), 'class') ?? ''

    expect(classes).toContain('[&>*:focus]:shadow-none')
    expect(classes).toContain('[&>*:focus-visible]:outline-2')
  })
})

describe('ButtonGroup semantics', () => {
  it('exposes its buttons as one group', () => {
    const html = renderToStaticMarkup(<ButtonGroup>{null}</ButtonGroup>)

    expect(attribute(openingTag(html, 'div'), 'role')).toBe('group')
  })

  it('lets the caller pick another role', () => {
    const html = renderToStaticMarkup(
      <ButtonGroup role="toolbar">{null}</ButtonGroup>
    )

    expect(attribute(openingTag(html, 'div'), 'role')).toBe('toolbar')
  })
})

describe('Avatar accessibility', () => {
  it('names the fallback with the person it stands for', () => {
    const html = renderToStaticMarkup(<Avatar name="Ada Lovelace" />)

    const root = openingTag(html, 'span')
    expect(attribute(root, 'role')).toBe('img')
    expect(attribute(root, 'aria-label')).toBe('Ada Lovelace')
  })

  it('hides the initials from the reading order', () => {
    const html = renderToStaticMarkup(<Avatar name="Ada Lovelace" />)

    expect(html).toMatch(/<span aria-hidden="true"[^>]*>\s*AL\s*<\/span>/)
  })

  it('hides an avatar that has no name to announce', () => {
    const html = renderToStaticMarkup(<Avatar />)

    const root = openingTag(html, 'span')
    expect(attribute(root, 'aria-hidden')).toBe('true')
    expect(attribute(root, 'role')).toBeUndefined()
  })

  it('moves the name onto the image once there is one', () => {
    const html = renderToStaticMarkup(
      <Avatar name="Ada Lovelace" src="/ada.jpg" />
    )

    expect(attribute(openingTag(html, 'img'), 'alt')).toBe('Ada Lovelace')
    expect(attribute(openingTag(html, 'span'), 'role')).toBeUndefined()
    expect(attribute(openingTag(html, 'span'), 'aria-label')).toBeUndefined()
  })

  it('prefers an explicit alt over the name', () => {
    const html = renderToStaticMarkup(
      <Avatar name="Ada Lovelace" alt="Ada Lovelace, project owner" />
    )

    expect(attribute(openingTag(html, 'span'), 'aria-label')).toBe(
      'Ada Lovelace, project owner'
    )
  })

  it('leaves an image with no name of any kind decorative', () => {
    const html = renderToStaticMarkup(<Avatar src="/ada.jpg" />)

    expect(attribute(openingTag(html, 'img'), 'alt')).toBe('')
  })

  it('lets the caller override the role it picks', () => {
    const html = renderToStaticMarkup(
      <Avatar name="Ada Lovelace" role="presentation" />
    )

    expect(attribute(openingTag(html, 'span'), 'role')).toBe('presentation')
  })
})

describe('Avatar initials', () => {
  it('takes the first and last word of a full name', () => {
    const html = renderToStaticMarkup(<Avatar name="Ada  Byron King" />)

    expect(html).toContain('>AK<')
  })

  it('takes a single letter from a mononym', () => {
    const html = renderToStaticMarkup(<Avatar name="Ada" />)

    expect(html).toContain('>A<')
  })

  it('keeps an astral first letter whole', () => {
    const html = renderToStaticMarkup(<Avatar name={'\u{1D4D0}da Lovelace'} />)

    expect(html).toContain('>\u{1D4D0}L<')
  })

  it('falls back to the icon when the name is blank', () => {
    const html = renderToStaticMarkup(<Avatar name="   " alt="Unknown" />)

    expect(html).toContain('<svg')
  })

  it('renders caller-supplied initials verbatim', () => {
    const html = renderToStaticMarkup(
      <Avatar name="Quantum Design System" initials="QDS" />
    )

    expect(html).toContain('>QDS<')
  })
})

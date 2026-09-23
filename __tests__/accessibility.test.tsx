import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest
} from '@jest/globals'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger
} from '../src/components/Accordion'
import { Avatar } from '../src/components/Avatar'
import { Badge } from '../src/components/Badge'
import { ButtonGroup } from '../src/components/ButtonGroup'
import { Checkbox } from '../src/components/Checkbox'
import {
  CheckboxGroup,
  CheckboxGroupItem
} from '../src/components/CheckboxGroup'
import { Chip } from '../src/components/Chip'
import { ControlLabel } from '../src/components/ControlLabel'
import {
  FieldDescription,
  FieldError,
  FormGroup
} from '../src/components/FormGroup'
import { IconButton, iconButtonVariants } from '../src/components/IconButton'
import { Input } from '../src/components/Input'
import { Label } from '../src/components/Label'
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

// `matchAll` rather than `match`, for the types: a `RegExpMatchArray` is an
// `Array<string | undefined>` past index 0, because a capture group can go
// unmatched -- this pattern has none, and every entry of an exec result's
// index 0 is a string.
const openingTags = (html: string, tag: string) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'g'))].map(match => match[0])

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

describe('Badge accessibility', () => {
  it('leaves its own text in the accessibility tree unnamed', () => {
    const tag = openingTag(renderToStaticMarkup(<Badge>Live</Badge>), 'span')

    expect(attribute(tag, 'role')).toBeUndefined()
    expect(attribute(tag, 'aria-label')).toBeUndefined()
  })

  // `aria-label` on a plain `<span>` has no role to name, and most screen
  // readers drop it, so a badge given one takes `role="img"` to hold it.
  it('gives a labelled badge a role for its label to name', () => {
    const labelled = openingTag(
      renderToStaticMarkup(<Badge aria-label="3 unread">3</Badge>),
      'span'
    )
    const referenced = openingTag(
      renderToStaticMarkup(<Badge aria-labelledby="inbox">3</Badge>),
      'span'
    )

    expect(attribute(labelled, 'role')).toBe('img')
    expect(attribute(referenced, 'role')).toBe('img')
  })

  it('leaves an empty label alone rather than naming nothing', () => {
    const tag = openingTag(
      renderToStaticMarkup(<Badge aria-label="">Live</Badge>),
      'span'
    )

    expect(attribute(tag, 'role')).toBeUndefined()
  })

  it("keeps the caller's own role", () => {
    const tag = openingTag(
      renderToStaticMarkup(
        <Badge role="status" aria-label="3 unread">
          3
        </Badge>
      ),
      'span'
    )

    expect(attribute(tag, 'role')).toBe('status')
  })

  // `role="img"` replaces the text with the accessible name, so without one
  // it fails 4.1.2 and hides the text it was put on. The badge refuses it
  // whoever asked, rather than only keeping its own generated role valid.
  it('refuses an unnamed img role even from the caller', () => {
    const bare = openingTag(
      renderToStaticMarkup(<Badge role="img">3</Badge>),
      'span'
    )
    const empty = openingTag(
      renderToStaticMarkup(
        <Badge role="img" aria-label="">
          3
        </Badge>
      ),
      'span'
    )
    const named = openingTag(
      renderToStaticMarkup(
        <Badge role="img" aria-label="3 unread">
          3
        </Badge>
      ),
      'span'
    )

    expect(attribute(bare, 'role')).toBeUndefined()
    expect(attribute(empty, 'role')).toBeUndefined()
    expect(attribute(named, 'role')).toBe('img')
  })

  it('passes every other caller-supplied role through unnamed', () => {
    const tag = openingTag(
      renderToStaticMarkup(<Badge role="status">3 unread</Badge>),
      'span'
    )

    expect(attribute(tag, 'role')).toBe('status')
  })

  it('hides its decorative dot and icon from assistive technology', () => {
    const dot = renderToStaticMarkup(<Badge dot>Online</Badge>)
    const icon = renderToStaticMarkup(<Badge icon={<svg />}>Verified</Badge>)

    expect(
      openingTags(dot, 'span').filter(tag => tag.includes('aria-hidden'))
    ).toHaveLength(1)
    expect(
      openingTags(icon, 'span').filter(tag => tag.includes('aria-hidden'))
    ).toHaveLength(1)
  })

  /**
   * The design puts the colour in the border and leaves the text near-black,
   * which is what keeps the whole set accessible without a per-hue weight:
   * `foreground` on any of the `-50` fills is 16:1 or better. A variant that
   * moved the colour into the text would be reintroducing the problem
   * __tests__/contrast.test.ts records for the `-600`/`-100` pairing.
   */
  it('keeps its text near-black and puts the colour in the border', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const

    for (const variant of variants) {
      const classes =
        attribute(
          openingTag(
            renderToStaticMarkup(<Badge variant={variant}>1</Badge>),
            'span'
          ),
          'class'
        ) ?? ''

      expect(classes).toContain('text-foreground')
      expect(classes).toContain('dark:text-foreground-dark')
      expect(classes).toMatch(/(?:^| )bg-[a-z]+-50(?: |$)/)
      expect(classes).toMatch(/(?:^| )border-[a-z][a-z0-9-]*(?: |$)/)
    }
  })

  /**
   * Dark mode is derived rather than designed: the fill drops to the page
   * background so the coloured border keeps carrying the meaning. Tinting the
   * fill would bury the border in it -- `feedback-red` on `red-900` is
   * 1.85:1 -- and leave error and success distinguished by fill alone.
   */
  it('drops the tinted fill in dark mode so the border still reads', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const

    for (const variant of variants) {
      const classes =
        attribute(
          openingTag(
            renderToStaticMarkup(<Badge variant={variant}>1</Badge>),
            'span'
          ),
          'class'
        ) ?? ''

      expect(classes).toContain('dark:bg-background-dark')
      expect(classes).not.toMatch(/dark:bg-[a-z]+-900/)
    }
  })

  // `border-none` would shrink these two by 4px and break the alignment of a
  // row that mixes them with the bordered variants.
  it('keeps the flat variants the same size as the bordered ones', () => {
    for (const variant of ['active', 'disabled'] as const) {
      const classes =
        attribute(
          openingTag(
            renderToStaticMarkup(<Badge variant={variant}>1</Badge>),
            'span'
          ),
          'class'
        ) ?? ''

      expect(classes).toContain('border-2')
      expect(classes).toContain('border-transparent')
      expect(classes).not.toContain('border-none')
    }
  })

  it('builds its neutral variant from the surface tokens', () => {
    const classes =
      attribute(
        openingTag(renderToStaticMarkup(<Badge>1</Badge>), 'span'),
        'class'
      ) ?? ''

    expect(classes).toContain('bg-background')
    expect(classes).toContain('border-border-subtle')
    expect(classes).toContain('dark:bg-background-dark')
    expect(classes).toContain('dark:text-foreground-dark')
  })
})

describe('IconButton accessibility', () => {
  it('names the button from its label', () => {
    const tag = openingTag(
      renderToStaticMarkup(
        <IconButton icon={<svg />} label="Delete article" />
      ),
      'button'
    )

    expect(attribute(tag, 'aria-label')).toBe('Delete article')
  })

  /**
   * `label` goes on before the spread, so a caller who has a name of their
   * own still wins. `aria-labelledby` is not fought over at all -- it beats
   * `aria-label` in the naming order wherever both are present, which is the
   * point of passing it.
   */
  it('lets the caller name it some other way', () => {
    const overridden = openingTag(
      renderToStaticMarkup(
        <IconButton icon={<svg />} label="Delete" aria-label="Delete article" />
      ),
      'button'
    )
    const referenced = openingTag(
      renderToStaticMarkup(
        <IconButton icon={<svg />} label="Delete" aria-labelledby="heading" />
      ),
      'button'
    )

    expect(attribute(overridden, 'aria-label')).toBe('Delete article')
    expect(attribute(referenced, 'aria-labelledby')).toBe('heading')
    expect(attribute(referenced, 'aria-label')).toBe('Delete')
  })

  /**
   * Spread over the top of the label, an empty or absent `aria-label` would
   * leave the button nameless, which is the one outcome `label` being
   * required exists to rule out. A button that names itself and then blanks
   * it has no reading that is not a mistake, so the name it was given stands.
   */
  it('keeps its label rather than being blanked by an empty one', () => {
    const empty = openingTag(
      renderToStaticMarkup(
        <IconButton icon={<svg />} label="Delete article" aria-label="" />
      ),
      'button'
    )
    const blank = openingTag(
      renderToStaticMarkup(
        <IconButton icon={<svg />} label="Delete article" aria-label="   " />
      ),
      'button'
    )
    const absent = openingTag(
      renderToStaticMarkup(
        <IconButton
          icon={<svg />}
          label="Delete article"
          aria-label={undefined}
        />
      ),
      'button'
    )

    expect(attribute(empty, 'aria-label')).toBe('Delete article')
    expect(attribute(blank, 'aria-label')).toBe('Delete article')
    expect(attribute(absent, 'aria-label')).toBe('Delete article')
  })

  /**
   * `label: string` stops the prop being forgotten; it does not stop it being
   * supplied empty, and the name-computation algorithm trims before it
   * decides, so `" "` is exactly as unnamed as `""`. Neither goes on the
   * element. The computed name is unchanged either way -- an empty
   * `aria-label` is skipped and the algorithm falls through to the contents,
   * which are an icon and say nothing -- but `aria-label=""` reads as a
   * deliberate suppression and is taken for one. With no attribute at all the
   * button is plainly unnamed, and axe's `button-name` rule reports it.
   */
  it.each([
    ['empty', ''],
    ['whitespace', '  ']
  ])('refuses to assert a name it does not have (%s)', (_name, label) => {
    const quiet = jest.spyOn(console, 'error').mockImplementation(() => {})

    try {
      const tag = openingTag(
        renderToStaticMarkup(<IconButton icon={<svg />} label={label} />),
        'button'
      )
      const overridden = openingTag(
        renderToStaticMarkup(
          <IconButton
            icon={<svg />}
            label={label}
            aria-label="Delete article"
          />
        ),
        'button'
      )

      expect(tag).not.toContain('aria-label')
      expect(attribute(overridden, 'aria-label')).toBe('Delete article')
    } finally {
      quiet.mockRestore()
    }
  })

  /**
   * `title` is the one prop of a `<button>` this component takes away. Not
   * because it competes for the name -- it is the last resort in the naming
   * order, behind both `aria-label` and the contents, so while there is a
   * label it never wins -- but because every reason to reach for it here is
   * already served better: a tooltip is `Tooltip`, reachable by keyboard and
   * by touch as a native one is not, and a name is `label`.
   *
   * There is nothing to assert at runtime, so the lock is the compiler. If
   * `title` is ever allowed back into the props, this directive stops
   * suppressing anything and `tsc` fails on the unused `@ts-expect-error`,
   * which `npm run typecheck` runs over this directory.
   */
  it('refuses a title at the type level', () => {
    const html = renderToStaticMarkup(
      // @ts-expect-error -- `title` is deliberately not one of the props
      <IconButton icon={<svg />} label="Delete article" title="Delete" />
    )

    // Only the type stops it: a `title` arriving through an untyped spread is
    // still rendered, because deleting an attribute a caller explicitly set
    // is a worse surprise than passing it through.
    expect(attribute(openingTag(html, 'button'), 'title')).toBe('Delete')
  })

  /**
   * The rest of the library stays silent, and the line between it and this is
   * worth holding to. What the other components cannot express is contextual
   * -- whether the page holds a second `ButtonGroup`, whether the heading
   * above a `RadioGroup` already names it -- so they cannot know they are
   * wrong. This one knows: an icon button with no accessible name has no
   * valid reading whatever surrounds it. That certainty is what earns the
   * warning, so it has to fire exactly where it is certain and nowhere else.
   */
  describe('the development warning', () => {
    let warn: jest.Spied<typeof console.error>

    beforeEach(() => {
      warn = jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
      warn.mockRestore()
    })

    it.each([
      ['an empty label', <IconButton key="a" icon={<svg />} label="" />],
      ['a whitespace label', <IconButton key="b" icon={<svg />} label="  " />],
      [
        'a label emptied by an override',
        <IconButton key="c" icon={<svg />} label="" aria-label=" " />
      ]
    ])('fires on %s', (_case, element) => {
      renderToStaticMarkup(element)

      expect(warn).toHaveBeenCalledTimes(1)
      expect(warn.mock.calls[0][0]).toContain('IconButton')
      expect(warn.mock.calls[0][0]).toContain('label')
    })

    /**
     * `aria-labelledby` names the button from text already on the page and
     * beats `aria-label` wherever both appear, so a caller reaching for it
     * has named the button and only fallen foul of the type. Warning there
     * would be crying wolf at the one alternative the docs recommend.
     */
    it.each([
      ['a label', <IconButton key="a" icon={<svg />} label="Delete" />],
      [
        'an overriding aria-label',
        <IconButton key="b" icon={<svg />} label="" aria-label="Delete" />
      ],
      [
        'an aria-labelledby',
        <IconButton key="c" icon={<svg />} label="" aria-labelledby="heading" />
      ]
    ])('stays quiet given %s', (_case, element) => {
      renderToStaticMarkup(element)

      expect(warn).not.toHaveBeenCalled()
    })
  })

  it('renders the icon as the whole of its content', () => {
    const html = renderToStaticMarkup(
      <IconButton icon={<svg data-icon="trash" />} label="Delete article" />
    )

    expect(html).toContain('data-icon="trash"')
    expect(openingTags(html, 'svg')).toHaveLength(1)
  })

  /**
   * A bare `<button>` inside a form submits it, and an icon button is most
   * often a close or a remove sitting inside one.
   */
  it('does not submit the form it is standing in', () => {
    const html = renderToStaticMarkup(
      <IconButton icon={<svg />} label="Remove row" />
    )

    expect(attribute(openingTag(html, 'button'), 'type')).toBe('button')
  })

  it('still submits when asked to', () => {
    const html = renderToStaticMarkup(
      <IconButton icon={<svg />} label="Search" type="submit" />
    )

    expect(attribute(openingTag(html, 'button'), 'type')).toBe('submit')
  })

  it('draws the focus indicator the other buttons draw', () => {
    const classes =
      attribute(
        openingTag(
          renderToStaticMarkup(<IconButton icon={<svg />} label="Add" />),
          'button'
        ),
        'class'
      ) ?? ''

    expect(classes).toContain('focus:shadow-brandGreen')
  })

  /**
   * Every size clears the 24x24 CSS pixels WCAG 2.2 asks of a target (2.5.8),
   * with the smallest at 36. Read off the classes rather than measured, so a
   * size added later has to clear it too -- the measurement itself is in the
   * `Sizes` story, which the test runner drives in a browser.
   */
  it.each(['xs', 'sm', 'md', 'lg'] as const)(
    'gives %s a square target big enough to hit',
    size => {
      const classes = iconButtonVariants({ size }).split(' ')
      const side = (prefix: string) => {
        const match = classes.find(name =>
          new RegExp(`^${prefix}-\\d`).test(name)
        )
        return Number(match?.slice(prefix.length + 1)) * 4
      }

      expect(side('h')).toBe(side('w'))
      expect(side('h')).toBeGreaterThanOrEqual(24)
    }
  )

  /**
   * The colours come from `Button` so that the two stay in step where they
   * sit side by side, and its paddings and text sizes are dropped so that
   * nothing competes with the square. Both halves of that are load-bearing
   * and neither is visible from this component's own class list.
   */
  it('wears Button’s colours without its box', () => {
    const classes =
      attribute(
        openingTag(
          renderToStaticMarkup(
            <IconButton icon={<svg />} label="Delete" variant="danger" />
          ),
          'button'
        ),
        'class'
      ) ?? ''

    expect(classes).toContain('bg-button-danger')
    expect(classes).toContain('hover:bg-button-danger-hover')
    // `p-2.5 text-sm` is `Button`'s `md`, which is its default and so the one
    // that leaks if `size: null` ever stops meaning "skip the default too".
    // Neither survives `tailwind-merge` against the square, so their absence
    // is the assertion that cva still behaves as the comment there claims.
    expect(classes.split(' ')).not.toContain('p-2.5')
    expect(classes.split(' ')).not.toContain('text-sm')
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

describe('FormGroup accessibility', () => {
  it('associates the label with the control it wraps', () => {
    const html = renderToStaticMarkup(
      <FormGroup>
        <Label>Email</Label>
        <input type="email" />
      </FormGroup>
    )

    const labelFor = attribute(openingTag(html, 'label'), 'for')
    expect(labelFor).toBeTruthy()
    expect(attribute(openingTag(html, 'input'), 'id')).toBe(labelFor)
  })

  it('keeps the id the control already had', () => {
    const html = renderToStaticMarkup(
      <FormGroup>
        <Label>Email</Label>
        <input type="email" id="email" />
      </FormGroup>
    )

    expect(attribute(openingTag(html, 'label'), 'for')).toBe('email')
    expect(attribute(openingTag(html, 'input'), 'id')).toBe('email')
  })

  it('wires a control that is not a host element, such as Checkbox', () => {
    const html = renderToStaticMarkup(
      <FormGroup>
        <Label>Notify me</Label>
        <Checkbox />
      </FormGroup>
    )

    const labelFor = attribute(openingTag(html, 'label'), 'for')
    expect(labelFor).toBeTruthy()
    expect(attribute(openingTag(html, 'button'), 'id')).toBe(labelFor)
  })

  it('describes the control with its hint rather than naming it', () => {
    const html = renderToStaticMarkup(
      <FormGroup controlId="email" description="We never share it">
        <Label>Email</Label>
        <input type="email" />
        <FieldDescription />
      </FormGroup>
    )

    const input = openingTag(html, 'input')
    expect(attribute(input, 'aria-describedby')).toBe('email-description')
    expect(attribute(input, 'aria-labelledby')).toBeUndefined()
    expect(html).toContain('id="email-description"')
  })

  it('describes the control with its error and marks it invalid', () => {
    const html = renderToStaticMarkup(
      <FormGroup controlId="email" error="Enter a valid address">
        <Label>Email</Label>
        <input type="email" />
        <FieldError />
      </FormGroup>
    )

    const input = openingTag(html, 'input')
    expect(attribute(input, 'aria-describedby')).toBe('email-error')
    expect(attribute(input, 'aria-invalid')).toBe('true')
    expect(html).toContain('id="email-error"')
    expect(html).toContain('Enter a valid address')
  })

  it('announces an error that appears after the page has loaded', () => {
    const html = renderToStaticMarkup(
      <FormGroup error="Enter a valid address">
        <input type="email" />
        <FieldError />
      </FormGroup>
    )

    expect(attribute(openingTag(html, 'p'), 'role')).toBe('alert')
  })

  /**
   * The error takes the hint's place rather than the space below it, so a
   * field does not change height as it is validated. That makes the pair safe
   * to write once and leave, which is what the stories do -- and it means the
   * hint's id has to leave `aria-describedby` with it, since the element it
   * names is no longer rendered.
   */
  it('replaces the hint with the error rather than showing both', () => {
    const html = renderToStaticMarkup(
      <FormGroup
        controlId="email"
        description="We never share it"
        error="Enter a valid address"
      >
        <input type="email" />
        <FieldDescription />
        <FieldError />
      </FormGroup>
    )

    expect(html).toContain('Enter a valid address')
    expect(html).not.toContain('We never share it')
    expect(attribute(openingTag(html, 'input'), 'aria-describedby')).toBe(
      'email-error'
    )
  })

  it('shows the hint again once the error clears', () => {
    const html = renderToStaticMarkup(
      <FormGroup controlId="email" description="We never share it">
        <input type="email" />
        <FieldDescription />
        <FieldError />
      </FormGroup>
    )

    expect(html).toContain('We never share it')
    expect(attribute(openingTag(html, 'input'), 'aria-describedby')).toBe(
      'email-description'
    )
  })

  /**
   * Auto-placement would put the control in row 1 only while the children
   * happen to be written in the order they are drawn. Written error-first, an
   * unpinned control would be pushed to row 2 -- below its own label.
   */
  it('keeps the control in the label row whatever order it is written in', () => {
    const html = renderToStaticMarkup(
      <FormGroup orientation="horizontal" error="Enter a valid address">
        <FieldError />
        <Label>Email</Label>
        <input type="email" />
      </FormGroup>
    )

    expect(openingTag(html, 'div', 'min-w-0')).toContain('row-start-1')
  })

  it('keeps a caller-supplied description alongside its own', () => {
    const html = renderToStaticMarkup(
      <FormGroup controlId="email" error="Enter a valid address">
        <input type="email" aria-describedby="policy" />
        <FieldError />
      </FormGroup>
    )

    expect(attribute(openingTag(html, 'input'), 'aria-describedby')).toBe(
      'policy email-error'
    )
  })

  /**
   * `aria-describedby` pointing at an id that is not in the document is worse
   * than saying nothing: a screen reader announces no description at all, so
   * the field loses the hint it would otherwise have had from its label.
   */
  it('does not point at a message that is not rendered', () => {
    const html = renderToStaticMarkup(
      <FormGroup controlId="email" error="Enter a valid address">
        <input type="email" />
      </FormGroup>
    )

    const input = openingTag(html, 'input')
    expect(attribute(input, 'aria-describedby')).toBeUndefined()
    expect(attribute(input, 'aria-invalid')).toBe('true')
  })

  it('takes the error written inline as the invalid state', () => {
    const html = renderToStaticMarkup(
      <FormGroup controlId="email">
        <input type="email" />
        <FieldError>Enter a valid address</FieldError>
      </FormGroup>
    )

    const input = openingTag(html, 'input')
    expect(attribute(input, 'aria-invalid')).toBe('true')
    expect(attribute(input, 'aria-describedby')).toBe('email-error')
  })

  it('renders no message, and marks nothing invalid, when there is none', () => {
    const html = renderToStaticMarkup(
      <FormGroup>
        <input type="email" />
        <FieldDescription />
        <FieldError />
      </FormGroup>
    )

    expect(html).not.toContain('<p')
    expect(attribute(openingTag(html, 'input'), 'aria-invalid')).toBeUndefined()
  })

  /**
   * The one place the group overrules the control. `aria-invalid="false"` is
   * the attribute's default and is indistinguishable from no attribute at all
   * in the accessibility tree, so a control carrying it has asserted nothing
   * -- and a template that ships it by default would otherwise sit inside a
   * group with an error and announce itself as valid while rendering an error
   * message.
   */
  it('marks a control invalid over its own aria-invalid=false', () => {
    const html = renderToStaticMarkup(
      <FormGroup error="Enter a valid address">
        <input type="email" aria-invalid={false} />
        <FieldError />
      </FormGroup>
    )

    expect(attribute(openingTag(html, 'input'), 'aria-invalid')).toBe('true')
  })

  it('keeps a control that says something more specific than invalid', () => {
    const html = renderToStaticMarkup(
      <FormGroup error="Check the spelling">
        <input type="text" aria-invalid="spelling" />
        <FieldError />
      </FormGroup>
    )

    expect(attribute(openingTag(html, 'input'), 'aria-invalid')).toBe(
      'spelling'
    )
  })

  it('flags a control invalid with no message to show', () => {
    const html = renderToStaticMarkup(
      <FormGroup invalid>
        <Label>Email</Label>
        <input type="email" />
      </FormGroup>
    )

    const input = openingTag(html, 'input')
    expect(attribute(input, 'aria-invalid')).toBe('true')
    expect(attribute(input, 'aria-describedby')).toBeUndefined()
  })

  /**
   * `error` is what the field says; `invalid` is what it claims about itself.
   * Set explicitly, the claim wins, so a message can be shown without being
   * treated as a validation failure.
   */
  it('lets invalid=false show the message without the flag', () => {
    const html = renderToStaticMarkup(
      <FormGroup controlId="email" invalid={false} error="Check this address">
        <input type="email" />
        <FieldError />
      </FormGroup>
    )

    const input = openingTag(html, 'input')
    expect(html).toContain('Check this address')
    expect(attribute(input, 'aria-describedby')).toBe('email-error')
    expect(attribute(input, 'aria-invalid')).toBeUndefined()
  })

  /**
   * `useFormGroup()` hands these ids out for a control the group cannot
   * reach, so a caller who applies them to one it *can* reach would name the
   * same element twice. The group's own id lands after the caller's tokens
   * because it is stripped and re-appended -- the description is announced in
   * idref order, and the field's own message reading last is the right way
   * round.
   */
  it('does not repeat an id the control already points at', () => {
    const html = renderToStaticMarkup(
      <FormGroup controlId="email" error="Enter a valid address">
        <input type="email" aria-describedby="email-error policy" />
        <FieldError />
      </FormGroup>
    )

    expect(attribute(openingTag(html, 'input'), 'aria-describedby')).toBe(
      'policy email-error'
    )
  })

  it('forwards disabled and required to the control', () => {
    const html = renderToStaticMarkup(
      <FormGroup disabled required>
        <Label>Email</Label>
        <input type="email" />
      </FormGroup>
    )

    const input = openingTag(html, 'input')
    expect(input).toContain('disabled')
    expect(input).toContain('required')
  })

  /**
   * React renders an unknown attribute on a host element verbatim, so a
   * `<div disabled="true">` would be markup the browser ignores and a console
   * warning -- and, worse, would read as a disabled field to nobody at all.
   */
  it('does not put form attributes on an element that cannot hold them', () => {
    const html = renderToStaticMarkup(
      <FormGroup disabled required>
        <div>
          <input type="email" />
        </div>
      </FormGroup>
    )

    expect(openingTag(html, 'div', 'id=')).not.toContain('disabled')
    expect(openingTag(html, 'div', 'id=')).not.toContain('required')
  })

  /**
   * The group owns its message ids in both directions. A caller's copy of one
   * would otherwise outlive the element it names -- a dangling idref, which
   * announces nothing at all.
   */
  it('drops a message id the control kept after the message went away', () => {
    const html = renderToStaticMarkup(
      <FormGroup controlId="email">
        <input type="email" aria-describedby="email-error policy" />
        <FieldError />
      </FormGroup>
    )

    expect(attribute(openingTag(html, 'input'), 'aria-describedby')).toBe(
      'policy'
    )
  })

  it('gives the id to one control only', () => {
    const html = renderToStaticMarkup(
      <FormGroup controlId="range">
        <input type="number" />
        <input type="number" />
      </FormGroup>
    )

    const ids = openingTags(html, 'input').map(tag => attribute(tag, 'id'))
    expect(ids).toEqual(['range', undefined])
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

  it('draws one on each button group member', () => {
    const html = renderToStaticMarkup(<ButtonGroup>{null}</ButtonGroup>)
    const classes = attribute(openingTag(html, 'div'), 'class') ?? ''

    expect(classes).toContain('[&>*:focus]:shadow-brandGreen')
    expect(classes).not.toContain('[&>*:focus]:shadow-none')
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

  it('drops its own name when the caller suppresses the role', () => {
    const html = renderToStaticMarkup(
      <Avatar name="Ada Lovelace" role="presentation" />
    )

    // `role="presentation"` plus an `aria-label` is a contradiction: the
    // browser resolves it by re-exposing the element under its implicit role,
    // so leaving our label behind would announce the avatar the caller just
    // asked to silence.
    const root = openingTag(html, 'span')
    expect(attribute(root, 'role')).toBe('presentation')
    expect(attribute(root, 'aria-label')).toBeUndefined()
  })

  it('hands the name to the caller along with the role', () => {
    const html = renderToStaticMarkup(
      <Avatar name="Ada Lovelace" role="button" aria-label="Change picture" />
    )

    const root = openingTag(html, 'span')
    expect(attribute(root, 'role')).toBe('button')
    expect(attribute(root, 'aria-label')).toBe('Change picture')
  })

  it('keeps an explicitly empty alt decorative rather than naming it', () => {
    const html = renderToStaticMarkup(<Avatar name="Ada Lovelace" alt="" />)

    const root = openingTag(html, 'span')
    expect(attribute(root, 'role')).toBeUndefined()
    expect(attribute(root, 'aria-hidden')).toBe('true')
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

/**
 * A group of choices is one question, and the thing that says so is the
 * `<fieldset>`: it is what makes "How should we contact you?" reach a reader
 * who has arrowed straight onto the third box, and what stops a form of
 * several groups from being one undifferentiated run of checkboxes.
 *
 * The group's own messages are published to the fieldset rather than to the
 * controls inside it, because a fieldset's description is announced when focus
 * first enters the group -- once, before the options, instead of once per
 * option. The per-control half of an error is `aria-invalid`, which is the
 * part a reader needs when they arrive at a single box.
 */
describe('CheckboxGroup accessibility', () => {
  it('names the group with its legend', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="How should we contact you?">
        <CheckboxGroupItem value="email" label="Email" />
      </CheckboxGroup>
    )

    // The caption only names the fieldset while it is the fieldset's own first
    // child; nested a level deeper it is bold text that names nothing.
    expect(html).toMatch(
      /<fieldset[^>]*><legend[^>]*>How should we contact you\?/
    )
  })

  it('associates each label with the box it belongs to', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact">
        <CheckboxGroupItem value="email" label="Email" />
      </CheckboxGroup>
    )

    const labelFor = attribute(openingTag(html, 'label'), 'for')
    expect(labelFor).toBeTruthy()
    expect(attribute(openingTag(html, 'button'), 'id')).toBe(labelFor)
  })

  it('describes the group with its hint', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" description="Select all that apply">
        <CheckboxGroupItem value="email" label="Email" />
      </CheckboxGroup>
    )

    const describedBy = attribute(
      openingTag(html, 'fieldset'),
      'aria-describedby'
    )
    expect(describedBy).toBeTruthy()
    expect(html).toContain(`id="${describedBy}"`)
    expect(html).toContain('Select all that apply')
  })

  it('describes the group with its error and marks every box invalid', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" error="Choose at least one">
        <CheckboxGroupItem value="email" label="Email" />
        <CheckboxGroupItem value="phone" label="Phone" />
      </CheckboxGroup>
    )

    const describedBy = attribute(
      openingTag(html, 'fieldset'),
      'aria-describedby'
    )
    expect(html).toContain(`id="${describedBy}"`)
    expect(openingTags(html, 'button')).toHaveLength(2)
    openingTags(html, 'button').forEach(button => {
      expect(attribute(button, 'aria-invalid')).toBe('true')
    })
  })

  it('announces an error that appears after the page has loaded', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" error="Choose at least one">
        <CheckboxGroupItem value="email" label="Email" />
      </CheckboxGroup>
    )

    expect(attribute(openingTag(html, 'p', 'role="alert"'), 'role')).toBe(
      'alert'
    )
    expect(html).toContain('Choose at least one')
  })

  it('keeps the hint alongside the error rather than replacing it', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup
        legend="Contact"
        description="Select all that apply"
        error="Choose at least one"
      >
        <CheckboxGroupItem value="email" label="Email" />
      </CheckboxGroup>
    )

    // Unlike a field, where the two share one line under one control: the
    // group's hint is instructions for reading the options, printed above
    // them, and an error below is not a reason to take the instructions away.
    expect(html).toContain('Select all that apply')
    expect(html).toContain('Choose at least one')
    expect(
      attribute(openingTag(html, 'fieldset'), 'aria-describedby')?.split(' ')
    ).toHaveLength(2)
  })

  it('lets invalid flag the group with no message to show', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" invalid>
        <CheckboxGroupItem value="email" label="Email" />
      </CheckboxGroup>
    )

    expect(attribute(openingTag(html, 'button'), 'aria-invalid')).toBe('true')
    expect(
      attribute(openingTag(html, 'fieldset'), 'aria-describedby')
    ).toBeUndefined()
  })

  it('lets invalid={false} render an error without the flag', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup
        legend="Contact"
        invalid={false}
        error="Choose at least one"
      >
        <CheckboxGroupItem value="email" label="Email" />
      </CheckboxGroup>
    )

    expect(html).toContain('Choose at least one')
    expect(
      attribute(openingTag(html, 'button'), 'aria-invalid')
    ).toBeUndefined()
  })

  it('describes a single box with the hint that belongs to it', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Delivery updates">
        <CheckboxGroupItem value="email" label="Email" />
        <CheckboxGroupItem
          value="push"
          label="Push notification"
          description="Requires the mobile app"
        />
      </CheckboxGroup>
    )

    const [plain, hinted] = openingTags(html, 'button')
    const describedBy = attribute(hinted, 'aria-describedby')

    expect(attribute(plain, 'aria-describedby')).toBeUndefined()
    expect(describedBy).toBeTruthy()
    expect(html).toContain(`id="${describedBy}"`)
    expect(html).toContain('Requires the mobile app')
  })

  it('takes the ticked boxes from the group rather than from each box', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" value={['phone']}>
        <CheckboxGroupItem value="email" label="Email" />
        <CheckboxGroupItem value="phone" label="Phone" />
      </CheckboxGroup>
    )

    const [email, phone] = openingTags(html, 'button')
    expect(attribute(email, 'aria-checked')).toBe('false')
    expect(attribute(phone, 'aria-checked')).toBe('true')
  })

  /**
   * `aria-invalid="false"` is the attribute's default and reads identically to
   * its absence, so an option carrying it has asserted nothing -- and letting
   * it suppress the group's error would render a box that is visibly invalid,
   * inside a group showing an error message, that tells a screen reader it is
   * fine. The same line `FormGroup` draws.
   */
  it('overrules an option that claims to be valid', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" error="Choose at least one">
        <CheckboxGroupItem value="email" label="Email" aria-invalid={false} />
      </CheckboxGroup>
    )

    expect(attribute(openingTag(html, 'button'), 'aria-invalid')).toBe('true')
  })

  it('keeps an option that asserts something more specific', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" error="Choose at least one">
        <CheckboxGroupItem
          value="email"
          label="Email"
          aria-invalid="spelling"
        />
      </CheckboxGroup>
    )

    expect(attribute(openingTag(html, 'button'), 'aria-invalid')).toBe(
      'spelling'
    )
  })

  /**
   * The box's border is derived from the attribute it ends up carrying rather
   * than from the group's state, so the two cannot disagree -- a box that
   * renders as invalid is a box that announces it.
   */
  it('draws the invalid border for exactly the boxes that announce it', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" error="Choose at least one">
        <CheckboxGroupItem value="email" label="Email" />
        <CheckboxGroupItem
          value="phone"
          label="Phone"
          aria-invalid="spelling"
        />
      </CheckboxGroup>
    )

    openingTags(html, 'button').forEach(button => {
      expect(attribute(button, 'aria-invalid')).toBeTruthy()
      expect(button).toContain('border-feedback-red')
    })

    const valid = renderToStaticMarkup(
      <CheckboxGroup legend="Contact">
        <CheckboxGroupItem value="email" label="Email" />
      </CheckboxGroup>
    )
    expect(openingTag(valid, 'button')).not.toContain('border-feedback-red')
  })

  /**
   * Which is why `disabled` is not the `<fieldset disabled>` attribute: the
   * browser's version cannot be opted out of, and "all of these are
   * unavailable except this one" is a thing a form legitimately says.
   */
  it('lets a single option stay live inside a disabled group', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" disabled>
        <CheckboxGroupItem value="email" label="Email" />
        <CheckboxGroupItem value="phone" label="Phone" disabled={false} />
      </CheckboxGroup>
    )

    // The attribute itself, not the substring: every box carries
    // `disabled:opacity-50` in its class list either way.
    const [email, phone] = [0, 1].map(i => openingTags(html, 'button')[i])
    expect(email).toMatch(/\sdisabled=""/)
    expect(phone).not.toMatch(/\sdisabled=""/)
  })

  /**
   * The group's promise to the server: one field name, one entry per ticked
   * box. Radix submits through a hidden input beside each control, so the
   * name has to reach every one of them rather than the fieldset.
   */
  it('submits every box under the group name', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" name="contact" value={['email']}>
        <CheckboxGroupItem value="email" label="Email" />
        <CheckboxGroupItem value="phone" label="Phone" />
      </CheckboxGroup>
    )

    const inputs = openingTags(html, 'input')
    expect(inputs).toHaveLength(2)
    inputs.forEach(input => {
      expect(attribute(input, 'name')).toBe('contact')
    })
    expect(inputs[0]).toContain('checked')
    expect(inputs[1]).not.toContain('checked')
  })

  it('disables every box in a disabled group', () => {
    const html = renderToStaticMarkup(
      <CheckboxGroup legend="Contact" disabled>
        <CheckboxGroupItem value="email" label="Email" />
        <CheckboxGroupItem value="phone" label="Phone" />
      </CheckboxGroup>
    )

    openingTags(html, 'button').forEach(button => {
      expect(button).toMatch(/\sdisabled=""/)
    })
    // Not as the fieldset attribute, which the browser applies to everything
    // inside with no way for one option to opt back in.
    expect(openingTag(html, 'fieldset')).not.toMatch(/\sdisabled=""/)
  })
})

describe('RadioGroup accessibility', () => {
  it('names the group with its legend', () => {
    const html = renderToStaticMarkup(
      <RadioGroup legend="Delivery">
        <Radio value="standard" label="Standard" />
      </RadioGroup>
    )

    expect(html).toMatch(/<fieldset[^>]*><legend[^>]*>Delivery/)
  })

  it('associates each label with the radio it belongs to', () => {
    const html = renderToStaticMarkup(
      <RadioGroup legend="Delivery">
        <Radio value="standard" label="Standard" />
      </RadioGroup>
    )

    const labelFor = attribute(openingTag(html, 'label'), 'for')
    expect(labelFor).toBeTruthy()
    expect(attribute(openingTag(html, 'button'), 'id')).toBe(labelFor)
  })

  it('describes the group with its error and marks every radio invalid', () => {
    const html = renderToStaticMarkup(
      <RadioGroup legend="Delivery" error="Choose one to continue">
        <Radio value="standard" label="Standard" />
        <Radio value="express" label="Express" />
      </RadioGroup>
    )

    const describedBy = attribute(
      openingTag(html, 'fieldset'),
      'aria-describedby'
    )
    expect(html).toContain(`id="${describedBy}"`)
    openingTags(html, 'button').forEach(button => {
      expect(attribute(button, 'aria-invalid')).toBe('true')
    })
  })

  it('overrules a radio that claims to be valid', () => {
    const html = renderToStaticMarkup(
      <RadioGroup legend="Delivery" error="Choose one to continue">
        <Radio value="standard" label="Standard" aria-invalid={false} />
      </RadioGroup>
    )

    const radio = openingTag(html, 'button')
    expect(attribute(radio, 'aria-invalid')).toBe('true')
    // The border follows the attribute rather than the group, so the two
    // cannot come apart.
    expect(radio).toContain('border-feedback-red')
  })

  it('describes a single radio with the hint that belongs to it', () => {
    const html = renderToStaticMarkup(
      <RadioGroup legend="Delivery">
        <Radio value="express" label="Express" description="Next working day" />
      </RadioGroup>
    )

    const describedBy = attribute(
      openingTag(html, 'button'),
      'aria-describedby'
    )
    expect(describedBy).toBeTruthy()
    expect(html).toContain(`id="${describedBy}"`)
    expect(html).toContain('Next working day')
  })

  /**
   * The pairing every existing caller writes, and the reason `label` is
   * optional rather than required: a `Radio` given no label of its own is the
   * bare control it has always been, with nothing wrapped around it for
   * `ControlLabel` to fight with.
   */
  it('stays a bare control for an external label', () => {
    const html = renderToStaticMarkup(
      <RadioGroup legend="Delivery">
        <ControlLabel htmlFor="standard" label="Standard">
          <Radio id="standard" value="standard" />
        </ControlLabel>
      </RadioGroup>
    )

    expect(attribute(openingTag(html, 'label'), 'for')).toBe('standard')
    expect(attribute(openingTag(html, 'button'), 'id')).toBe('standard')
    expect(openingTags(html, 'label')).toHaveLength(1)
  })
})

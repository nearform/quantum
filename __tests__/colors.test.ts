import { describe, expect, it } from '@jest/globals'

import theme from '../src/colors'

/**
 * Structural checks on the token tree, as opposed to the contrast checks in
 * contrast.test.ts that read the values.
 *
 * Tailwind builds a class name out of the path to each leaf, collapsing the key
 * `DEFAULT` into the parent's name, so a token group is only reachable under
 * the name it is written to have while its light half is spelled exactly that.
 * `button.*.selected` carried `DEFAILT` in all five variants (#186): the light
 * token was emitted as `bg-button-primary-selected-DEFAILT` and
 * `bg-button-primary-selected` resolved to nothing. Nothing caught it —
 * a typo'd key is still a valid Tailwind theme, it just names a different
 * class, and no component had reached for the token yet.
 */

type TokenTree = { [key: string]: string | TokenTree }

/** Every object in the tree, with the dotted path that reaches it. */
const groupsOf = (tree: TokenTree, path = ''): [string, TokenTree][] =>
  Object.entries(tree).flatMap(([key, value]) =>
    typeof value === 'object'
      ? [
          [path ? `${path}.${key}` : key, value] as [string, TokenTree],
          ...groupsOf(value, path ? `${path}.${key}` : key)
        ]
      : []
  )

const groups = groupsOf(theme as TokenTree)

describe('token groups', () => {
  it('finds the groups to check', () => {
    expect(groups.length).toBeGreaterThan(0)
  })

  /**
   * A group with a `dark` half is a light/dark pair, and the light half of a
   * pair is always `DEFAULT` — that is what makes `dark:bg-x-dark` line up with
   * `bg-x`. A pair whose light key is spelled any other way is either the
   * typo above or a token that cannot be addressed by the name it appears to
   * have; both are worth failing on.
   */
  it.each(groups.filter(([, group]) => 'dark' in group))(
    '%s pairs its dark half with a DEFAULT',
    (_path, group) => {
      expect(Object.keys(group)).toContain('DEFAULT')
    }
  )
})

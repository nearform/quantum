import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { BsPersonFill } from '@/assets'

const avatarVariants = cva(
  [
    [
      'relative',
      'inline-flex',
      'shrink-0',
      'items-center',
      'justify-center',
      'overflow-hidden',
      'select-none',
      'font-semibold',
      'uppercase'
    ],
    ['bg-background-alt', 'text-foreground'],
    ['dark:bg-background-alt-dark', 'dark:text-foreground-dark']
  ],
  {
    variants: {
      size: {
        xs: ['h-6', 'w-6', 'text-[10px]'],
        sm: ['h-8', 'w-8', 'text-xs'],
        default: ['h-10', 'w-10', 'text-sm'],
        lg: ['h-12', 'w-12', 'text-base'],
        xl: ['h-16', 'w-16', 'text-xl']
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg'
      }
    },
    defaultVariants: {
      size: 'default',
      shape: 'circle'
    }
  }
)

const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      xs: ['h-3.5', 'w-3.5'],
      sm: ['h-4', 'w-4'],
      default: ['h-5', 'w-5'],
      lg: ['h-6', 'w-6'],
      xl: ['h-8', 'w-8']
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

/**
 * First letter of the first word plus first letter of the last word, so
 * "Ada Lovelace" reads "AL" and a mononym reads a single letter.
 *
 * Split with `Array.from` rather than `[0]`: indexing a string walks UTF-16
 * code units, so a name starting outside the BMP — an emoji, or one of the
 * supplementary-plane scripts — would yield half a surrogate pair and render
 * as a replacement character.
 */
const initialsFrom = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) return ''

  const first = Array.from(words[0])[0]
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] : ''

  return `${first}${last}`
}

interface AvatarProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>,
    VariantProps<typeof avatarVariants> {
  /**
   * Image to show. Until it loads — and permanently, if it fails to load — the
   * initials or the icon show in its place.
   */
  src?: string
  /** Who the avatar stands for: names it, and seeds the initials. */
  name?: string
  /** Initials to render instead of the ones derived from `name`. */
  initials?: string
  /** Accessible name to use instead of `name`, for the image and the fallback alike. */
  alt?: string
  /** Icon to render instead of the default person glyph when there are no initials. */
  icon?: React.ReactNode
}

/**
 * The image sits on top of the fallback rather than replacing it, so the
 * initials cover the gap while it loads instead of the avatar flashing empty.
 * Only one of the two is ever exposed to assistive technology: the `<img>`
 * carries the accessible name whenever it is rendered, and the fallback layer
 * is `aria-hidden` throughout.
 */
const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { className, size, shape, src, name, initials, alt, icon, ...props },
    ref
  ) => {
    // Keyed by the URL that failed rather than a boolean, so a new `src` is
    // retried instead of inheriting the previous one's failure.
    const [failedSrc, setFailedSrc] = React.useState<string>()
    const showImage = Boolean(src) && src !== failedSrc

    const label = alt ?? name
    const text = initials ?? (name ? initialsFrom(name) : '')

    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size, shape }), className)}
        // An avatar with no name to announce is decorative: whoever renders it
        // already has the person's name in the surrounding text.
        role={!showImage && label ? 'img' : undefined}
        aria-label={!showImage ? label : undefined}
        aria-hidden={showImage || label ? undefined : true}
        {...props}
      >
        <span
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center"
        >
          {text || icon || (
            <BsPersonFill className={cn(iconVariants({ size }))} />
          )}
        </span>
        {showImage && (
          <img
            src={src}
            alt={label ?? ''}
            onError={() => setFailedSrc(src)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </span>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar, AvatarProps }

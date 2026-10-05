import { useState } from 'react'
import { BsGithub } from 'react-icons/bs'
import {
  WebsiteHeader,
  WebsiteHeaderLogo,
  WebsiteHeaderNav,
  WebsiteHeaderLink,
  WebsiteHeaderActions,
  WebsiteHeaderMenuButton,
  WebsiteHeaderMobileMenu
} from '@/index'
import { Button } from '@/index'

const Logo = () => (
  <span className="inline-flex items-center gap-0.5">
    <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden="true">
      <path
        d="M5 0h13l-1 3H4z M3 6.5h13l-1 3H2z M1 13h13l-1 3H0z"
        fill="#5850EC"
      />
    </svg>
    <span className="text-2xl font-bold italic leading-none tracking-tight">
      Initium
    </span>
  </span>
)

export const WebsiteHeaderDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="w-full">
      <WebsiteHeader>
        <WebsiteHeaderLogo href="#">
          <Logo />
        </WebsiteHeaderLogo>

        <WebsiteHeaderNav aria-label="Main">
          <WebsiteHeaderLink href="#" active>
            Docs
          </WebsiteHeaderLink>
          <WebsiteHeaderLink href="#">Link 1</WebsiteHeaderLink>
        </WebsiteHeaderNav>

        <WebsiteHeaderActions>
          <a
            href="#"
            aria-label="GitHub"
            className="text-foreground dark:text-foreground-dark"
          >
            <BsGithub size={20} />
          </a>
          <span className="inline-flex items-center rounded border border-border-subtle dark:border-border-subtle-dark px-2 py-0.5 text-xs font-medium text-foreground-subtle dark:text-foreground-muted-dark">
            npm
          </span>
          <Button size="sm">Get started</Button>
        </WebsiteHeaderActions>

        <WebsiteHeaderMenuButton
          open={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        />
      </WebsiteHeader>

      <WebsiteHeaderMobileMenu open={menuOpen}>
        <WebsiteHeaderLink href="#" active>
          Docs
        </WebsiteHeaderLink>
        <WebsiteHeaderLink href="#">Link 1</WebsiteHeaderLink>
        <div className="flex items-center gap-2 pt-2">
          <a
            href="#"
            aria-label="GitHub"
            className="text-foreground dark:text-foreground-dark"
          >
            <BsGithub size={20} />
          </a>
          <span className="inline-flex items-center rounded border border-border-subtle dark:border-border-subtle-dark px-2 py-0.5 text-xs font-medium text-foreground-subtle dark:text-foreground-muted-dark">
            npm
          </span>
          <Button size="sm">Get started</Button>
        </div>
      </WebsiteHeaderMobileMenu>
    </div>
  )
}

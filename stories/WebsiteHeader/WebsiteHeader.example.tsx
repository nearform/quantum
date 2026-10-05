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

const Logo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="120"
    height="28"
    viewBox="0 0 120 28"
    fill="none"
    aria-label="Initium"
  >
    <text
      x="0"
      y="22"
      fill="currentColor"
      fontFamily="system-ui, sans-serif"
      fontWeight="700"
      fontSize="22"
    >
      ≡Initium
    </text>
  </svg>
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

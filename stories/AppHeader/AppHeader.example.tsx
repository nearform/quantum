import { useState } from 'react'
import { BsBell, BsSearch } from 'react-icons/bs'
import {
  AppHeader,
  AppHeaderLogo,
  AppHeaderNav,
  AppHeaderLink,
  AppHeaderActions,
  AppHeaderMenuButton,
  AppHeaderMobileMenu,
  Avatar,
  IconButton
} from '@/index'

const Logo = () => (
  <span className="inline-flex items-center gap-1.5">
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <rect width="20" height="20" rx="4" fill="#5850EC" />
      <path d="M6 6h8v2H6zM6 9h8v2H6zM6 12h5v2H6z" fill="white" />
    </svg>
    <span className="text-sm font-semibold">Acme App</span>
  </span>
)

export const AppHeaderDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="w-full">
      <AppHeader>
        <AppHeaderLogo href="#">
          <Logo />
        </AppHeaderLogo>

        <AppHeaderNav aria-label="Main">
          <AppHeaderLink href="#" active>
            Dashboard
          </AppHeaderLink>
          <AppHeaderLink href="#">Projects</AppHeaderLink>
          <AppHeaderLink href="#">Settings</AppHeaderLink>
        </AppHeaderNav>

        <AppHeaderActions>
          <IconButton variant="ghost" size="sm" aria-label="Search">
            <BsSearch />
          </IconButton>
          <IconButton variant="ghost" size="sm" aria-label="Notifications">
            <BsBell />
          </IconButton>
          <Avatar size="sm" aria-label="User avatar">
            JD
          </Avatar>
        </AppHeaderActions>

        <AppHeaderMenuButton
          open={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        />
      </AppHeader>

      <AppHeaderMobileMenu open={menuOpen}>
        <AppHeaderLink href="#" active>
          Dashboard
        </AppHeaderLink>
        <AppHeaderLink href="#">Projects</AppHeaderLink>
        <AppHeaderLink href="#">Settings</AppHeaderLink>
        <div className="flex items-center gap-2 pt-2">
          <IconButton variant="ghost" size="sm" aria-label="Search">
            <BsSearch />
          </IconButton>
          <IconButton variant="ghost" size="sm" aria-label="Notifications">
            <BsBell />
          </IconButton>
          <Avatar size="sm" aria-label="User avatar">
            JD
          </Avatar>
        </div>
      </AppHeaderMobileMenu>
    </div>
  )
}

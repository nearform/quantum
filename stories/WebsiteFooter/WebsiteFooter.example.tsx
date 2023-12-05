import { SubtractIcon } from '@/assets/build/subtract.icon'
import {
  WebsiteFooter,
  FooterStatement,
  LinkColumn,
  LinkRow,
  type WebsiteFooterProps
} from '@/index'

interface Props extends WebsiteFooterProps {
  variant: 'standard' | 'complex' | 'small'
}

const WebsiteFooterStandard = () => {
  return (
    <div className="w-full">
      <WebsiteFooter size="standard">
        <FooterStatement>
          <SubtractIcon className="h-[24px] w-[24px]" />
          Quantum is an open source community project
        </FooterStatement>
        <LinkRow>
          <LinkColumn title="Social Media">
            <a href="#">Twitter/X</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </LinkColumn>
          <LinkColumn title="Our Website">
            <a href="#">Homepage</a>
            <a href="#">About us</a>
          </LinkColumn>
          <LinkColumn title="Your Account">
            <a href="#">Manage Your Account</a>
            <a href="#">Privacy</a>
            <a href="#">Log Out</a>
          </LinkColumn>
          <LinkColumn title="About us">
            <a href="#">About us</a>
            <a href="#">Security</a>
            <a href="#">Accessibility</a>
          </LinkColumn>
        </LinkRow>
        <FooterStatement size="sm">Copyright © 2023 Nearform.</FooterStatement>
      </WebsiteFooter>
    </div>
  )
}

const WebsiteFooterComplex = () => {
  return (
    <div className="w-full">
      <WebsiteFooter size="standard">
        <FooterStatement>
          <SubtractIcon className="h-[24px] w-[24px]" />
          Quantum is an open source community project
        </FooterStatement>
        <LinkRow>
          <LinkColumn size="md" title="Social Media">
            <a href="#">Twitter/X</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </LinkColumn>
          <LinkColumn size="md" title="Our Website">
            <a href="#">Homepage</a>
            <a href="#">About us</a>
          </LinkColumn>
          <LinkColumn size="md" title="Your Account">
            <a href="#">Manage Your Account</a>
            <a href="#">Privacy</a>
            <a href="#">Log Out</a>
          </LinkColumn>
          <LinkColumn size="md" title="About us">
            <a href="#">About us</a>
            <a href="#">Security</a>
            <a href="#">Accessibility</a>
          </LinkColumn>
          <LinkColumn size="md" title="Link Column 1">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </LinkColumn>
          <LinkColumn size="md" title="Link Column 2">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </LinkColumn>
        </LinkRow>
        <FooterStatement size="sm">Copyright © 2023 Nearform.</FooterStatement>
      </WebsiteFooter>
    </div>
  )
}
const WebsiteFooterSmall = () => {
  return (
    <div className="w-full">
      <WebsiteFooter size="sm">
        <FooterStatement>
          <SubtractIcon className="h-[24px] w-[24px]" />
          Quantum is an open source community project
        </FooterStatement>
        <LinkRow>
          <LinkColumn size="sm" title="Social Media">
            <a href="#">Twitter/X</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </LinkColumn>
          <LinkColumn size="sm" title="Our Website">
            <a href="#">Homepage</a>
            <a href="#">About us</a>
          </LinkColumn>
          <LinkColumn size="sm" title="Your Account">
            <a href="#">Manage Your Account</a>
            <a href="#">Privacy</a>
            <a href="#">Log Out</a>
          </LinkColumn>
          <LinkColumn size="sm" title="About us">
            <a href="#">About us</a>
            <a href="#">Security</a>
            <a href="#">Accessibility</a>
          </LinkColumn>
        </LinkRow>
        <FooterStatement size="sm">Copyright © 2023 Nearform.</FooterStatement>
      </WebsiteFooter>
    </div>
  )
}

export const WebsiteFooterDemo = ({ variant }: Props) => {
  return (
    <>
      {variant === 'standard' && <WebsiteFooterStandard />}
      {variant === 'complex' && <WebsiteFooterComplex />}
      {variant === 'small' && <WebsiteFooterSmall />}
    </>
  )
}

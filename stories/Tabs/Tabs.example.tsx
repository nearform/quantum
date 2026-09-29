import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/index'
import type { TabsTriggerProps } from '@/index'
import { BsBell, BsGear, BsPerson } from '@/assets'

type TabsDemoProps = {
  orientation?: 'horizontal' | 'vertical'
  size?: TabsTriggerProps['size']
  activationMode?: 'automatic' | 'manual'
  withCount?: boolean
  withIcons?: boolean
  withDisabled?: boolean
}

const tabs = [
  { value: 'account', label: 'Account', icon: BsPerson },
  { value: 'notifications', label: 'Notifications', icon: BsBell, count: 4 },
  { value: 'settings', label: 'Settings', icon: BsGear },
  { value: 'billing', label: 'Billing' },
  { value: 'team', label: 'Team' },
  { value: 'archive', label: 'Archive' }
]

const TabsDemo = ({
  orientation = 'horizontal',
  size,
  activationMode,
  withCount = false,
  withIcons = false,
  withDisabled = false
}: TabsDemoProps) => (
  <Tabs
    defaultValue="account"
    orientation={orientation}
    activationMode={activationMode}
    className="w-[640px]"
  >
    <TabsList aria-label="Profile sections">
      {tabs.map(({ value, label, icon: Icon, count }) => (
        <TabsTrigger
          key={value}
          value={value}
          size={size}
          count={withCount ? count : undefined}
          disabled={withDisabled && value === 'archive'}
        >
          {withIcons && Icon && <Icon aria-hidden="true" />}
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
    {tabs.map(({ value, label }) => (
      <TabsContent
        key={value}
        value={value}
        className="p-4 text-sm text-foreground dark:text-foreground-dark"
      >
        The {label.toLowerCase()} panel.
      </TabsContent>
    ))}
  </Tabs>
)

const TabsStates = ({ size }: Pick<TabsTriggerProps, 'size'>) => (
  <Tabs defaultValue="selected">
    <TabsList aria-label="Tab states">
      <TabsTrigger value="default" size={size}>
        Tab
      </TabsTrigger>
      <TabsTrigger value="selected" size={size}>
        Tab
      </TabsTrigger>
      <TabsTrigger value="disabled" size={size} disabled>
        Tab
      </TabsTrigger>
    </TabsList>
  </Tabs>
)

export { TabsDemo, TabsStates, type TabsDemoProps }

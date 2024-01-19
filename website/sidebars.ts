import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  quantumSidebar: [
    {
      type: 'doc',
      label: 'Getting Started',
      id: 'getting-started'
    },
    {
      type: 'category',
      label: 'Foundations',
      link: {
        type: 'generated-index',
        title: 'Foundations',
        description: 'A list of all available Foundation docs'
      },
      items: ['foundations/colour', 'foundations/typography']
    },
    {
      type: 'category',
      label: 'Components',
      link: {
        type: 'generated-index',
        title: 'Components',
        description: 'A list of all available Components docs'
      },
      items: [
        'components/icon-button/index',
        {
          type: 'doc',
          id: 'component-groups/cards/react',
          className: 'hide-from-sidebar'
        },
        'components/hero-button/index'
        // more-components
      ]
    },
    {
      type: 'category',
      label: 'Component Groups',
      link: {
        type: 'generated-index',
        title: 'Component groups',
        description: 'A list of all available Component groups docs'
      },
      items: [
        'component-groups/cards/index',
        {
          type: 'doc',
          id: 'component-groups/cards/react',
          className: 'hide-from-sidebar'
        }
        // more-component-groups
      ]
    }
    // You can add more categories or docs here if needed
  ]
}

export default sidebars

import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '570'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '6e8'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'fdd'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c52'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'd84'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'cf7'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '2a2'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '76c'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '447'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '8aa'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'aac'),
            routes: [
              {
                path: '/docs/category/components',
                component: ComponentCreator('/docs/category/components', '577'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/foundations',
                component: ComponentCreator('/docs/category/foundations', 'f3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/accordion/',
                component: ComponentCreator('/docs/components/accordion/', '049'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/foundations/colour',
                component: ComponentCreator('/docs/foundations/colour', '489'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/foundations/typography',
                component: ComponentCreator('/docs/foundations/typography', 'b89'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', 'aed'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '674'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

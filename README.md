# Quantum Component Library

![CI](https://github.com/nearform/quantum/actions/workflows/ci.yml/badge.svg?event=push) [![Figma](https://img.shields.io/badge/figma-designs-f24e1e?logo=figma)](https://www.figma.com/design/XFbhstkgQFz8ZefAU3w2p4/1.-Quantum-Design-System?m=auto&node-id=1-5&t=nMe5iB6lqqJ52oc4-1)

> A React component library based on the Quantum Design System

## Installation

```
npm install --save @nearform/quantum
```

## Configuration

#### With Tailwind

Include or extend our colour configuration and add our components to Tailwind's content configuration. To ensure dark mode of the components isn't operating system dependent, add the `darkMode: "class"` entry to the config.

```js
// tailwind.config.js
import quantumPlugin from '@nearform/quantum/tailwind-plugin'
module.exports = {
  //...tailwind config
  plugins: [quantumPlugin]
  darkMode: "class"
}
```

#### Without Tailwind

```js
//root component
import '@nearform/quantum/dist/global.css'
import { Button } from '@nearform/quantum'
```

## Tests

To run tests for the project, run:

```js
npm run test
```

To run Storybook tests for the project, run:


```js
npm run test-storybook
```

## Usage

Just import:

```js
import { Button, ButtonGroup } from '@nearform/quantum'
```

And use:

```jsx
<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

[![banner](https://raw.githubusercontent.com/nearform/.github/refs/heads/master/assets/os-banner-green.svg)](https://www.nearform.com/contact/?utm_source=open-source&utm_medium=banner&utm_campaign=os-project-pages)

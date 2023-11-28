# Quantum Component Library

![CI](https://github.com/nearform/quantum/actions/workflows/ci.yml/badge.svg?event=push) [![Figma](https://img.shields.io/badge/figma-designs-f24e1e?logo=figma)](https://www.figma.com/file/XFbhstkgQFz8ZefAU3w2p4/1.-Quantum-Design-System?type=design&node-id=1-5&mode=design&t=Zjds6CFL8asuPc4a-0)

> A React component library based on the Quantum Design System

## Installation

```
npm install --save @nearform/quantum
```

## Configuration

#### With Tailwind

Inclue or extend our colour configuration and add our components to Tailwind's content configuration. The quantumPlugin is a function that can accept a `node_modules_path` string variable, but is only required if your tailwind configs `content.relative` is set to true.

```js
// tailwind.config.js
const quantumPlugin = require('@nearform/quantum/plugin')
module.exports = {
  //...tailwind config
  plugins: [quantumPlugin()]
}
```

In the example below, `tailwind.config.js` is in a child directory of the root directory. Therefore we pass in `../` into `quantumPlugin` to indicate so.

```js
// tailwind.config.js
const quantumPlugin = require('@nearform/quantum/plugin')
module.exports = {
  content: {
    relative: true,
    files: ['...']
  }
  plugins: [quantumPlugin('../')]
}
```

#### Without Tailwind

```js
//root component
import '@nearform/quantum/dist/global.css'
import { Button } from '@nearform/quantum'
```

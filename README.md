# Quantum Component Library

![CI](https://github.com/nearform/quantum/actions/workflows/ci.yml/badge.svg?event=push) [![Figma](https://img.shields.io/badge/figma-designs-f24e1e?logo=figma)](https://www.figma.com/file/XFbhstkgQFz8ZefAU3w2p4/1.-Quantum-Design-System?type=design&node-id=1-5&mode=design&t=Zjds6CFL8asuPc4a-0)

> A React component library based on the Quantum Design System

## Installation

```
npm install --save @nearform/quantum
```

## Configuration

#### With Tailwind

Inclue or extend our colour configuration and add our components to Tailwind's content configuration.

```js
// tailwind.config.js

module.exports = {
  content: [
    //your content files...
    './node_modules/@nearform/quantum/**/*.js'
  ],
  // The rest of your config... ,
  plugins: [require('@nearform/quantum/plugin')]
}
```

#### Without Tailwind

```js
//root component
import '@nearform/quantum/dist/global.css'
import { Button } from '@nearform/quantum' // NodeNext / Node16
const { Checkbox } = require('@nearform/quantum') //commonjs
```

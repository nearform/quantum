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
import colors from '@nearform/quantum/colors'

module.exports = {
    colors,
    content: [
        "./node_modules/@nearform/quantum/**/*.js"
    ]
};
```

#### Without Tailwind

```js
import '@nearform/quantum/dist/global.css';
import { Navbar } from '@nearform/quantum';
```

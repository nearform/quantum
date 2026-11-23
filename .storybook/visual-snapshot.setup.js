/* eslint-disable @typescript-eslint/no-require-imports, no-undef */
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

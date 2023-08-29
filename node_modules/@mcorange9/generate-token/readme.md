

[![npm (scoped)](https://img.shields.io/npm/v/@mcorange9/generate-token.svg)](https://www.npmjs.com/package/@mcorange9/generate-token)

[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@mcorange9/generate-token.svg)](https://www.npmjs.com/package/@mcorange9/generate-token)

Generates random tokens/strings

## Install

```
$ npm install @mcorange9/generate-token
```

## Usage

```js
const generateToken = require("@mcorange9/generate-token")

const gen = new generateToken(/** Custom chars */);

console.log(gen.generateToken(10))

```
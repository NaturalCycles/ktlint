## @naturalcycles/ktlint

> [ktlint](https://github.com/pinterest/ktlint) conveniently published to npm registry

[![npm](https://img.shields.io/npm/v/@naturalcycles/ktlint/latest.svg)](https://www.npmjs.com/package/@naturalcycles/ktlint)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![ktlint](https://img.shields.io/badge/code%20style-%E2%9D%A4-FF4081.svg)](https://ktlint.github.io/)

Current ktlint version: ~~0.43.2~~ `0.40.0`

Because `0.43.2` fails on Java 16+: https://github.com/pinterest/ktlint/issues/1195

# Quick start

Install:

```shell
yarn add -D @naturalcycles/ktlint
```

Run ktlint:

```shell
yarn ktlint --version
```

No Step 3!

## API

You can run `ktlint` programmatically via Node.js by calling `ktlintAll()` function exposed by this
module. It returns a Promise (rejects on non-zero code from `ktlint`, resolves on success).

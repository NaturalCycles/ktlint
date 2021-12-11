## @naturalcycles/ktlint

> [ktlint](https://github.com/pinterest/ktlint), conveniently published to npm registry

[![npm](https://img.shields.io/npm/v/@naturalcycles/ktlint/latest.svg)](https://www.npmjs.com/package/@naturalcycles/ktlint)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![ktlint](https://img.shields.io/badge/code%20style-%E2%9D%A4-FF4081.svg)](https://ktlint.github.io/)

Current ktlint version: `0.43.2`

# Features

## ktlint binary

Hosts `ktlint` binary in the npm registry.

So, you can install it as:

```shell
yarn add -D @naturalcycles/ktlint

# or with npm
npm i --save-dev @naturalcycles/ktlint
```

And access it as `node_modules/@naturalcycles/ktlint/resources/ktlint`.

E.g:

```shell
node_modules/@naturalcycles/ktlint/resources/ktlint --version
```

## run-ktlint

It exposes a `run-ktlint` CLI command, so you can run it like this (passing the arguments that you
would pass to ktlint):

```shell
yarn run-ktlint -F

# or

yarn run-ktlint "someFile.kt"
```

Test it with `yarn run-ktlint --version`

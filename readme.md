## @naturalcycles/ktlint

> [ktlint](https://github.com/pinterest/ktlint) conveniently published to npm registry

[![npm](https://img.shields.io/npm/v/@naturalcycles/ktlint/latest.svg)](https://www.npmjs.com/package/@naturalcycles/ktlint)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![ktlint](https://img.shields.io/badge/code%20style-%E2%9D%A4-FF4081.svg)](https://ktlint.github.io/)

Current ktlint version: `1.3.1`

# Quick start

Just run it without installation:

```shell
npx @naturalcycles/ktlint --version
```

Or, install it like this:

```shell
yarn add -D @naturalcycles/ktlint
```

Run ktlint (locally installed into `./node_modules`):

```shell
yarn ktlint --version
```

No Step 3!

## API

You can run `ktlint` programmatically via Node.js by calling `ktlintAll()` function exposed by this
module. It returns a Promise (rejects on non-zero code from `ktlint`, resolves on success).

## Development

To update the ktlint version that is shipped here:

- Check the ktlint [release notes](https://github.com/pinterest/ktlint/releases)
- Change it in `scripts/install.ts` to the new version (and in this readme.md too)
- Delete `resources/ktlint`
- Run `yarn tsn install`, which will download the new version
- Test it with `yarn ktlint --version`, it should print the new version
- Test it with `yarn ktlint -F`

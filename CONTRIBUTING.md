# Contributing to Backbone.DeepModel plugin

You can work on either *Linux* or *Windows*.

## Table of Contents

- [Setup](#setup)
- [Test](#test)
- [Lint](#lint)
- [Build](#build)
- [Release](#release)

## Setup

```sh
git clone https://github.com/ybiquitous/backbone.deepmodel.git
cd backbone.deepmodel
yarn
```

## Test

Test runner used in this project is [Karma](https://karma-runner.github.io/).

```sh
yarn test
```

Watching file changes:

```sh
yarn test:watch
```

## Lint

```sh
yarn lint
```

## Build

Source code is written in *ECMAScript 6*. Build by

- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.github.io/)

```sh
yarn build
```

Full-build includes test and lint:

```sh
yarn fullbuild
```

## Release

1. Update `get VERSION() { return '<new_version>' }` in [lib/index.js](lib/index.js).
2. Commit `lib/index.js` in message `chore: prepare to release <new_version>`.
3. Run `npm version <new_version> -m "chore: release %s"`. See [npm-version](https://docs.npmjs.com/cli/version).
4. Regenerate API documentation on [ESDoc Hosting](https://doc.esdoc.org/).

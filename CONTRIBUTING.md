# Contributing to Backbone.DeepModel plugin

You can work on either *Linux* or *Windows*.

## Table of Contents

- [Setup](#setup)
- [Test](#test)
- [Lint](#lint)
- [Build](#build)
- [Commit](#commit)
- [Release](#release)

## Setup

```sh
git clone https://github.com/ybiquitous/backbone.deepmodel.git
cd backbone.deepmodel
npm install
```

## Test

Test runner used in this project is [Karma](https://karma-runner.github.io/).

```sh
npm test
```

Watching file changes:

```sh
npm run test:watch
```

## Lint

```sh
npm run lint
```

## Build

Source code is written in *ECMAScript 6*. Build by

- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.github.io/)

```sh
npm run build
```

Full-build includes test and lint:

```sh
npm run fullbuild
```

## Commit

Required *Commitizen friendly* commit message. See [details](https://github.com/commitizen/cz-cli).

**RECOMMENDED** command is `npm run commit` instead of `git commit`.

## Release

1. Update `get VERSION() { return '<new_version>' }` in `lib/index.js`.
2. Commit `lib/index.js` in message `chore: prepare to release <new_version>`.
3. Run `npm version <new_version> -m "chore: release %s"`. See [npm-version](https://docs.npmjs.com/cli/version).
4. Run `npm publish`. See [npm-publish](https://docs.npmjs.com/cli/publish).
5. Regenerate API documentation on [ESDoc Hosting](https://doc.esdoc.org/).

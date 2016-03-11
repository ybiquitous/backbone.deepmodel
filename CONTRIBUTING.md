# Contributing to Backbone.DeepModel plugin

You can work on Either Linux or Windows OS.

## Setup

```sh
$ git clone https://github.com/ybiquitous/backbone.deepmodel.git
$ cd backbone.deepmodel
$ npm install
```

## Test

Test runner used in this project is [Karma](https://karma-runner.github.io/).

By default, run tests on *PhantomJS*:
```sh
$ npm test
```

In case of *Google Chrome* and *Firefox*:
```sh
$ npm test -- --browsers Chrome,Firefox
```

Watching file changes (by default on *PhantomJS*):
```sh
$ npm run test:watch
```

In case of *Google Chrome*:
```sh
$ npm run test:watch -- --browsers Chrome
```

Run tests on all browsers(also *Internet Explorer* if current OS is *Windows*):
```sh
$ npm run test:all
```

## Lint

```sh
$ npm run lint
```

## Build

Source code is written in *ECMAScript 6*. Build by [Babel](https://babeljs.io/) and [Webpack](https://webpack.github.io/).

```sh
$ npm run build
```

Full-build includes test and lint:
```sh
$ npm run fullbuild
```

## Commit

Required *Commitizen friendly* commit message. See [details](https://github.com/commitizen/cz-cli).

**RECOMMENDED** command is `npm run commit`, instead of `git commit`.

## Release

1. Update `get VERSION() {...}` in `lib/index.js`.
2. Run `npm version <new_version>`. See [npm-version](https://docs.npmjs.com/cli/version).
3. Run `npm publish`. See [npm-publish](https://docs.npmjs.com/cli/publish).

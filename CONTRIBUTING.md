# Contributing to Backbone.DeepModel plugin

You can work on Either Linux or Windows OS.

## Setup

```sh
$ git clone https://github.com/ybiquitous/backbone.deepmodel.git
$ cd backbone.deepmodel
$ npm install
```

## Test

```sh
$ npm test
```

Watching file changes:
```sh
$ npm run test-watch
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

**DO NOT USE** `git commit`. Please use:

```sh
$ npm run commit
```

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

Source code is written in *ECMAScript 2015+*. Build by

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

Follow the [Conventional Commits Specification](https://conventionalcommits.org/).

## Release

1. `git checkout master && git pull`
1. `npm run release` (or `npm run release:dry-run`)
1. `git push --follow-tags`

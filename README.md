# Backbone.DeepModel plugin

[![NPM version][npm-version-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Codecov Status][codecov-image]][codecov-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Conventional Commits][conventionalcommits-image]][conventionalcommits-url]

[![Sauce Test Status][saucelabs-image]][saucelabs-url]

Super simple and lightweight [Backbone.js](http://backbonejs.org/) plugin
to handle nested attributes of `Backbone.Model`.

Please see [demo](https://ybiquitous.github.io/backbone.deepmodel/demo).

## Table of Contents

- [Install](#install)
- [Dependencies](#dependencies)
- [Use](#use)
- [Changelog](#changelog)
- [Contribute](#contribute)
- [License](#license)

## Install

via `npm`:

```sh
npm install backbone backbone.deepmodel
```

via `yarn`:

```sh
yarn add backbone backbone.deepmodel
```

or download manually:

- [backbone.deepmodel.min.js](https://unpkg.com/backbone.deepmodel/dist/backbone.deepmodel.min.js)
- [backbone.deepmodel.js](https://unpkg.com/backbone.deepmodel/dist/backbone.deepmodel.js)

## Dependencies

- [Backbone.js](http://backbonejs.org/) 1.2+

## Use

```js
import DeepModel from 'backbone.deepmodel'

class Person extends DeepModel {
  defaults() {
    return {
      name: {first: '', last: ''},
      pets: []
    }
  }
}

const p = new Person()
p.set('name.first', 'Tom')
```

In browser:

```html
<script src="//unpkg.com/underscore/underscore-min.js"></script>
<script src="//unpkg.com/backbone/backbone-min.js"></script>
<script src="//unpkg.com/backbone.deepmodel/dist/backbone.deepmodel.min.js"></script>
```

For details, see [API Documentation](https://ybiquitous.github.io/backbone.deepmodel/identifiers.html).

## Changelog

See [here](CHANGELOG.md).

## Contribute

See [here](CONTRIBUTING.md).

## License

[MIT](LICENSE) © ybiquitous

[npm-url]: https://npmjs.org/package/backbone.deepmodel
[npm-version-image]: https://img.shields.io/npm/v/backbone.deepmodel.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/backbone.deepmodel.svg

[travis-url]: https://travis-ci.org/ybiquitous/backbone.deepmodel
[travis-image]: https://img.shields.io/travis/ybiquitous/backbone.deepmodel.svg

[codecov-url]: https://codecov.io/gh/ybiquitous/backbone.deepmodel
[codecov-image]: https://codecov.io/gh/ybiquitous/backbone.deepmodel/branch/master/graph/badge.svg

[codeclimate-url]: https://codeclimate.com/github/ybiquitous/backbone.deepmodel
[codeclimate-image]: https://codeclimate.com/github/ybiquitous/backbone.deepmodel/badges/gpa.svg

[conventionalcommits-url]: https://conventionalcommits.org
[conventionalcommits-image]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[saucelabs-url]: https://saucelabs.com/beta/builds/cef26002b550423191e4d8d8cbb1ed64
[saucelabs-image]: https://saucelabs.com/browser-matrix/ybiquitous.svg

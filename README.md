[![NPM version][npm-version-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Codecov Status][codecov-image]][codecov-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Dependency Status][dependency-image]][dependency-url]
[![Documentation][documentation-image]][documentation-url]
[![Conventional Commits][conventionalcommits-image]][conventionalcommits-url]

[![Sauce Test Status][saucelabs-image]][saucelabs-url]

# Backbone.DeepModel plugin

Super simple and lightweight [Backbone.js](http://backbonejs.org/) plugin
to handle nested attributes of `Backbone.Model`.

Please see [demo](https://ybiquitous.github.io/backbone.deepmodel/demo).

## Table of Contents

- [Install](#install)
- [Dependencies](#dependencies)
- [Use](#use)
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

## Contribute

See [here](CONTRIBUTING.md).

## License

MIT License. See [here](LICENSE).

[npm-url]: https://npmjs.org/package/backbone.deepmodel
[npm-version-image]: https://img.shields.io/npm/v/backbone.deepmodel.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/backbone.deepmodel.svg

[travis-url]: https://travis-ci.org/ybiquitous/backbone.deepmodel
[travis-image]: https://img.shields.io/travis/ybiquitous/backbone.deepmodel.svg

[codecov-url]: https://codecov.io/gh/ybiquitous/backbone.deepmodel
[codecov-image]: https://codecov.io/gh/ybiquitous/backbone.deepmodel/branch/master/graph/badge.svg

[dependency-url]: https://david-dm.org/ybiquitous/backbone.deepmodel
[dependency-image]: https://img.shields.io/david/ybiquitous/backbone.deepmodel.svg
[dev-dependency-url]: https://david-dm.org/ybiquitous/backbone.deepmodel#info=devDependencies
[dev-dependency-image]: https://img.shields.io/david/dev/ybiquitous/backbone.deepmodel.svg

[documentation-url]: https://doc.esdoc.org/github.com/ybiquitous/backbone.deepmodel/
[documentation-image]: https://doc.esdoc.org/github.com/ybiquitous/backbone.deepmodel/badge.svg

[codeclimate-url]: https://codeclimate.com/github/ybiquitous/backbone.deepmodel
[codeclimate-image]: https://codeclimate.com/github/ybiquitous/backbone.deepmodel/badges/gpa.svg

[conventionalcommits-url]: https://conventionalcommits.org
[conventionalcommits-image]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[saucelabs-url]: https://saucelabs.com/beta/builds/cef26002b550423191e4d8d8cbb1ed64
[saucelabs-image]: https://saucelabs.com/browser-matrix/ybiquitous.svg

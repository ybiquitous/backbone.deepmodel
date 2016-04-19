[![NPM version][npm-version-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][dependency-image]][dependency-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]

# Backbone.DeepModel plugin

> Simple and light [Backbone.js](http://backbonejs.org/) plugin for handling nested attributes of `Backbone.Model`.

## Table of Contents

- [Install](#install)
- [Dependencies](#dependencies)
- [Use](#use)
- [Use in ES6](#use-in-es6)
- [API](#api)
- [Examples](#examples)
- [Contribute](#contribute)

## Install

```sh
npm install backbone.deepmodel --save
```

Or download manually:

- [backbone.deepmodel.min.js](dist/backbone.deepmodel.min.js)
- [backbone.deepmodel.js](dist/backbone.deepmodel.js)

## Dependencies

- [Backbone.js](http://backbonejs.org/) (>= 1.2.0)

## Use

```js
var Person = Backbone.DeepModel.extend({
  defaults: {
    name: {first: '', last: ''},
    pets: []
  }
});

var p = new Person();

// Object
p.set('name.first', 'Tom');
p.set('name.last', 'Watson');
console.log(p.get('name')); //=> {first: 'Tom', last: 'Watson'}
console.log(p.get('name.first')); //=> 'Tom'
console.log(p.get('name.last')); //=> 'Watson'

// Array
p.set('pets[0]', {name: 'Mi', kind: 'Cat'});
p.set('pets.1', {name: 'Boo', kind: 'Dog'});
console.log(p.get('pets[0].name')); //=> 'Mi'
console.log(p.get('pets[0].kind')); //=> 'Cat'
console.log(p.get('pets.1')); //=> {name: 'Boo', kind: 'Dog'}

// key-value style
p.set({
  'name.first': 'Ken',
  'pets[0].name': 'Tama',
});
console.log(p.get('name.first')); //=> 'Ken'
console.log(p.get('pets[0].name')); //=> 'Tama'
```

## Use in ES6

```js
import DeepModel from 'backbone.deepmodel/lib'

class Person extends DeepModel {
  defaults() {
    return {
      name: {first: '', last: ''},
      pets: []
    };
  }
}

let p = new Person();
p.set('name.first', 'Tom');
```

## API

See [API Documentation](https://doc.esdoc.org/github.com/ybiquitous/backbone.deepmodel/identifiers.html).

## Examples

To try examples, please run the following commands.
When the web server is started on localhost, then go to `/examples` directory.

```sh
$ git clone git://github.com/ybiquitous/backbone.deepmodel.git --depth 1
$ cd backbone.deepmodel
$ npm install
$ npm run examples
```

## Contribute

See [here](CONTRIBUTING.md).


[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/backbone.deepmodel
[npm-version-image]: https://img.shields.io/npm/v/backbone.deepmodel.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/backbone.deepmodel.svg

[travis-url]: https://travis-ci.org/ybiquitous/backbone.deepmodel
[travis-image]: https://img.shields.io/travis/ybiquitous/backbone.deepmodel.svg

[coverage-url]: https://coveralls.io/github/ybiquitous/backbone.deepmodel
[coverage-image]: https://img.shields.io/coveralls/ybiquitous/backbone.deepmodel.svg

[dependency-url]: https://david-dm.org/ybiquitous/backbone.deepmodel
[dependency-image]: https://img.shields.io/david/ybiquitous/backbone.deepmodel.svg
[dev-dependency-url]: https://david-dm.org/ybiquitous/backbone.deepmodel#info=devDependencies
[dev-dependency-image]: https://img.shields.io/david/dev/ybiquitous/backbone.deepmodel.svg

[commitizen-url]: http://commitizen.github.io/cz-cli
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

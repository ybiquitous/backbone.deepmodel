# Backbone.DeepModel plugin

[![NPM version][npm-version-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][dependency-image]][dependency-url]

Simple and light [Backbone.js](http://backbonejs.org/) plugin for handling nested attributes of `Backbone.Model`.

# Install

By `npm` (Node.js):

```sh
$ npm install backbone.deepmodel --save
```

Manually download:

- [backbone.deepmodel.min.js](dist/backbone.deepmodel.min.js)
- [backbone.deepmodel.js](dist/backbone.deepmodel.js)

# Dependencies

- [Backbone.js](http://backbonejs.org/) (>= 1.2.0)

# Use

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

# Use in ES2015(ES6)

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

# API

## DeepModel (extends [Backbone.Model](http://backbonejs.org/#Model))

```js
// ES5
var Person = DeepModel.extend({...});

// ES2015(ES6)
class Person extends DeepModel {...}
```

## DeepModel.prototype.get(attribute: string)

Override [Backbone.Model.prototype.get](http://backbonejs.org/#Model-get).

```js
model.get('a.b');
```

## DeepModel.prototype.set(attributes: Object, options?: Object)

Override [Backbone.Model.prototype.set](http://backbonejs.org/#Model-set).
Support `set('key', 'value', options)` style.

```js
model.set({'a.b': 'value'});
model.set('a.b', 'value');
```

## DeepModel.defaults(settings?: Object)

```js
DeepModel.defaults({anySetting: true});
DeepModel.defaults(null); // reset!
```

### _pathSeparator: string_ (default: '.')

```js
DeepModel.defaults({pathSeparator: '/'});

var model = new DeepModel();
model.set('a', {});
model.set('a/b', 1);
model.get('a/b'); //=> 1
```

### _pathParser: (string) => string[]_ (default: null)

```js
DeepModel.defaults({
  pathParser: function(path) {
    if (path === '*') {
      return []; // returns empty array if ignore
    }
    return path.split('_');
  }
});

var model = new DeepModel();
model.set('a', {});
model.set('a_b', 1);
model.get('a_b'); //=> 1
model.set('*', 2);
model.get('*'); //=> undefined
```

# Examples

To try examples, please run the following commands.
When the web server is started on localhost, then go to `/examples` directory.

```sh
$ git clone git://github.com/ybiquitous/backbone.deepmodel.git --depth 1
$ cd backbone.deepmodel
$ npm install
$ npm run examples
```

# Test

```sh
$ npm install
$ npm test
# or watch mode "npm run test-watch"
```

# Build

By [babel](https://babeljs.io/) and [webpack](https://webpack.github.io/).

```sh
$ npm install
$ npm run build
```


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

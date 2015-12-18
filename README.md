# Backbone.DeepModel

[![NPM](https://nodei.co/npm/backbone.deepmodel.png?downloads=true)](https://nodei.co/npm/backbone.deepmodel/)

[![Build Status](https://travis-ci.org/ybiquitous/backbone.deepmodel.svg?branch=master)](https://travis-ci.org/ybiquitous/backbone.deepmodel)
[![Dependency Status](https://david-dm.org/ybiquitous/backbone.deepmodel.svg)](https://david-dm.org/ybiquitous/backbone.deepmodel)
[![DevDependency Status](https://david-dm.org/ybiquitous/backbone.deepmodel/dev-status.svg)](https://david-dm.org/ybiquitous/backbone.deepmodel#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/ybiquitous/backbone.deepmodel/badge.svg?branch=master&service=github)](https://coveralls.io/github/ybiquitous/backbone.deepmodel?branch=master)

Simple and light [Backbone.js](http://backbonejs.org/) plugin for handling nested attributes of `Backbone.Model`.

# Install

By `npm` (Node.js):

```sh
$ npm install backbone.deepmodel --save
```

Manually download:

- [backbone.deepmodel.min.js](https://rawgithub.com/ybiquitous/backbone.deepmodel/master/dist/backbone.deepmodel.min.js) (*1.5kb, minified and gzipped*)
- [backbone.deepmodel.js](https://rawgithub.com/ybiquitous/backbone.deepmodel/master/dist/backbone.deepmodel.js) (*for development*)

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
var Person = DeepModel.extend({...});
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

### pathSeparator (default: '.')

```js
DeepModel.defaults({pathSeparator: '/'});

var model = new DeepModel();
model.set('a', {});
model.set('a/b', 1);
model.get('a/b'); //=> 1
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

# License

[MIT](https://github.com/ybiquitous/backbone.deepmodel/blob/master/LICENSE) Copyright (c) 2015 ybiquitous

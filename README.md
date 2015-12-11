# Backbone.DeepModel

[![NPM](https://nodei.co/npm/backbone.deepmodel.png?downloads=true)](https://nodei.co/npm/backbone.deepmodel/)

[![Build Status](https://travis-ci.org/ybiquitous/backbone.deepmodel.svg?branch=master)](https://travis-ci.org/ybiquitous/backbone.deepmodel)
[![Dependency Status](https://david-dm.org/ybiquitous/backbone.deepmodel.svg)](https://david-dm.org/ybiquitous/backbone.deepmodel)
[![DevDependency Status](https://david-dm.org/ybiquitous/backbone.deepmodel/dev-status.svg)](https://david-dm.org/ybiquitous/backbone.deepmodel#info=devDependencies)

[Backbone](http://backbonejs.org/) Plugin for handling nested attributes of `Backbone.Model`.

# Install

Node.js:
```sh
$ npm install backbone.deepmodel --save
```

HTML:
```html
<script src="https://rawgithub.com/ybiquitous/backbone.deepmodel/master/dist/backbone.deepmodel.js"></script>
```

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
console.log(p.get('pets[0].name')); //=> 'Mi'
console.log(p.get('pets[0].kind')); //=> 'Cat'
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

```sh
$ npm install
$ npm run build
```

# Lint

```sh
$ npm install
$ npm run lint
```

# LICENSE

[MIT](https://github.com/ybiquitous/backbone.deepmodel/blob/master/LICENSE) Copyright (c) 2015 ybiquitous

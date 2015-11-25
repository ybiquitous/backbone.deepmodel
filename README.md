# Backbone.DeepModel

[Backbone](http://backbonejs.org/) Plugin for handling nested attributes of `Backbone.Model`.

# Install

```sh
npm install backbone.deepmodel --save
```

# Usage

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

See [example](https://github.com/ybiquitous/backbone.deepmodel/blob/master/examples/index.html).

# LICENSE

MIT

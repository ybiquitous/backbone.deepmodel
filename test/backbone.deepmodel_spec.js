/* eslint-env mocha */
/* global should, sinon */
import DeepModel from '../lib';

describe('Backbone.DeepModel', () => {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('returns version', () => {
    DeepModel.VERSION.should.match(/^\d+\.\d+\.\d+$/);
  });

  it('extends custom class by `extend` static method', () => {
    const Model = DeepModel.extend({
      initialize() {
        this.initialized = 1;
      }
    }, {
      foo: 1
    });
    Model.foo.should.equal(1);
    Model.extend.should.be.a('function');
    new Model().initialized.should.equal(1);

    const Model2 = Model.extend({
      initialize() {
        Model.prototype.initialize.call(this);
        this.initialized2 = 2;
      }
    });
    Model2.foo.should.equal(1);
    Model2.extend.should.be.a('function');
    const model = new Model2();
    model.initialized.should.equal(1);
    model.initialized2.should.equal(2);
  });

  it('extends custom class by `class` syntacs', () => {
    class Model extends DeepModel {
      initialize() {
        this.initialized = 1;
      }
    }
    Model.extend.should.be.a('function');
    new Model().initialized.should.equal(1);

    class Model2 extends Model {
      initialize() {
        super.initialize();
        this.initialized2 = 2;
      }
    }
    Model2.extend.should.be.a('function');
    const model2 = new Model2();
    model2.initialized.should.equal(1);
    model2.initialized2.should.equal(2);
  });

  it('gets attributes', () => {
    const model = new DeepModel({a: 1, b: {x: '*', y: [true, false]}});
    model.get('a').should.equal(1);
    model.get('b').should.deep.equal({x: '*', y: [true, false]});
    model.get('b.x').should.equal('*');
    model.get('b.y').should.deep.equal([true, false]);
    model.get('b.y[0]').should.equal(true);
    model.get('b.y.1').should.equal(false);
    should.equal(model.get('b.y[2]'), undefined);
    should.equal(model.get('c'), undefined);
    should.equal(model.get('b.z'), undefined);
  });

  it('sets no arguments', () => {
    const model = new DeepModel({a: 1});
    model.get('a').should.equal(1);
    model.set().should.equal(model);
  });

  it('sets simple attribute', () => {
    const model = new DeepModel();
    const change = sandbox.spy();
    const changeA = sandbox.spy();
    const changeB = sandbox.spy();
    model.on('change', change);
    model.on('change:a', changeA);
    model.on('change:b', changeB);

    const options = {dummy: true};
    model.set('a', 1);
    model.get('a').should.equal(1);

    model.set({'a': 2, 'b': '*'}, options);
    model.get('a').should.equal(2);
    model.get('b').should.equal('*');

    change.callCount.should.equal(2, 'change');
    change.args.should.deep.equal([
      [model, {}],
      [model, options]
    ], 'change');

    changeA.callCount.should.equal(2, 'change:a');
    changeA.args.should.deep.equal([
      [model, 1, {}],
      [model, 2, options]
    ], 'change:a');

    changeB.callCount.should.equal(1, 'change:b');
    changeB.args.should.deep.equal([
      [model, '*', options]
    ], 'change:b');
  });

  it('sets nested attribute', () => {
    const model = new DeepModel({
      a: {b: {c: null}},
      x: {y: [true]}
    });
    const change = sandbox.spy();
    const changeA = sandbox.spy();
    const changeX = sandbox.spy();
    model.on('change', change);
    model.on('change:a', changeA);
    model.on('change:x', changeX);

    const options = {dummy: true};
    model.set('a.b.c', 1, options);
    model.get('a.b.c').should.equal(1);

    model.set({'a.b.c': 2}, options);
    model.get('a.b.c').should.equal(2);

    model.set('a.b', {c: 3});
    model.get('a.b.c').should.equal(3);

    model.set('x.y[0]', false, options);
    model.get('x.y[0]').should.equal(false);
    model.get('x').should.deep.equal({y: [false]});

    model.set('x.y.1', 0, options);
    model.get('x.y.1').should.equal(0);
    model.get('x').should.deep.equal({y: [false, 0]});

    model.set({
      'a.b.c': 9,
      'x.y[0]': null,
      'x.y.1': '-'
    });
    model.toJSON().should.deep.equal({
      a: {b: {c: 9}},
      x: {y: [null, '-']}
    });

    change.callCount.should.equal(6, 'change');
    change.args.should.deep.equal([
      [model, options],
      [model, options],
      [model, {}],
      [model, options],
      [model, options],
      [model, {}]
    ], 'change');

    changeA.callCount.should.equal(4, 'change:a');
    changeA.args.should.deep.equal([
      [model, {b: {c: 1}}, options],
      [model, {b: {c: 2}}, options],
      [model, {b: {c: 3}}, {}],
      [model, {b: {c: 9}}, {}]
    ], 'change:a');

    changeX.callCount.should.equal(3, 'change:x');
    changeX.args.should.deep.equal([
      [model, {y: [false]}, options],
      [model, {y: [false, 0]}, options],
      [model, {y: [null, '-']}, {}]
    ], 'change:x');
  });

  it('sets array element', () => {
    const model = new DeepModel();
    model.set('a', ['*']);
    model.toJSON().should.deep.equal({a: ['*']});
    model.set('a[0]', '?');
    model.toJSON().should.deep.equal({a: ['?']});
    model.set('a[1]', '/');
    model.toJSON().should.deep.equal({a: ['?', '/']});
    model.set('a[2]', {b: false});
    model.toJSON().should.deep.equal({a: ['?', '/', {b: false}]});
    model.set('a[2].b', true);
    model.toJSON().should.deep.equal({a: ['?', '/', {b: true}]});
  });

  it('cannot set non-existent nested attribute', () => {
    (() => { new DeepModel().set('a.b', 1); }).should.throw(Error);
  });

  describe('Ajax', () => {
    class User extends DeepModel {
      urlRoot() {
        return '/users';
      }
      defaults() {
        return {
          name: {first: '', last: ''}
        };
      }
    }

    let server;
    beforeEach(() => {
      server = sandbox.useFakeServer();
      server.respondImmediately = true;
    });

    const respondWith = (method, url, responseBody) => {
      server.respondWith(method, url, [
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(responseBody)
      ]);
    };

    const expectRequest = (method, url, requestBody) => {
      server.requests.should.have.length(1);

      const request = server.requests[0];
      request.should.have.property('method', method);
      request.should.have.property('url', url);
      request.should.have.property(
        'requestBody',
        requestBody ? JSON.stringify(requestBody) : requestBody
      );
    };

    it('fetches from server', () => {
      respondWith('GET', '/users/1', {
        id: 1, name: {first: 'John', last: 'Lennon'}
      });

      const user = new User({id: 1});
      user.fetch();
      user.toJSON().should.deep.equal({
        id: 1, name: {first: 'John', last: 'Lennon'}
      });

      expectRequest('GET', '/users/1', null);
    });

    it('saves new model to server', () => {
      respondWith('POST', '/users', {
        id: 1,
        name: {first: 'Paul', last: 'McCartney'},
        updatedAt: '2012-05-09 03:45:21'
      });

      const user = new User();
      user.save({
        'name.first': 'John',
        'name.last': 'Lennon'
      });
      user.toJSON().should.deep.equal({
        id: 1,
        name: {first: 'Paul', last: 'McCartney'},
        updatedAt: '2012-05-09 03:45:21'
      });

      expectRequest('POST', '/users', {
        name: {first: 'John', last: 'Lennon'}
      });
    });

    it('saves updated model to server', () => {
      respondWith('PUT', '/users/1', {
        id: 1,
        name: {first: 'Paul', last: 'McCartney'},
        updatedAt: '2012-05-09 03:45:21'
      });

      const user = new User({id: 1});
      user.save({
        'name.first': 'John',
        'name.last': 'Lennon'
      });
      user.toJSON().should.deep.equal({
        id: 1,
        name: {first: 'Paul', last: 'McCartney'},
        updatedAt: '2012-05-09 03:45:21'
      });

      expectRequest('PUT', '/users/1', {
        id: 1, name: {first: 'John', last: 'Lennon'}
      });
    });
  });

  describe('configure', () => {
    beforeEach(() => {
      DeepModel.defaults({pathSeparator: '/'});
    });

    it('configures path separator', () => {
      const model = new DeepModel();
      model.set('a', {});
      model.toJSON().should.deep.equal({a: {}});
      model.set('a/b', 1);
      model.get('a/b').should.equal(1);
      model.toJSON().should.deep.equal({a: {b: 1}});
      model.set('a.b', 2);
      model.get('a.b').should.equal(2);
      model.toJSON().should.deep.equal({a: {b: 1}, 'a.b': 2});

      DeepModel.defaults(null); // reset

      model.set('a/b', 0);
      model.get('a/b').should.equal(0);
      model.toJSON().should.deep.equal({a: {b: 1}, 'a.b': 2, 'a/b': 0});
      model.get('a.b').should.equal(1);
    });

    afterEach(() => {
      DeepModel.defaults(null);
    });
  });

});

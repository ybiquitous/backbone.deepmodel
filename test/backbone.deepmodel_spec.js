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

  it('sets version', () => {
    DeepModel.VERSION.should.equal('0.0.1');
  });

  it('extends custom class by `extend` static method', () => {
    let Model = DeepModel.extend({
      initialize: function() {
        this.initialized = true;
      }
    }, {
      foo: 1
    });
    new Model().initialized.should.be.true;
    Model.foo.should.equal(1);
  });

  it('extends custom class by `class` syntacs', () => {
    class Model extends DeepModel {
      initialize() {
        this.initialized = true;
      }
    }
    new Model().initialized.should.be.true;
  });

  it('gets attributes', () => {
    let model = new DeepModel({a: 1, b: {x: '*', y: [true, false]}});
    model.get('a').should.equal(1);
    model.get('b').should.deep.equal({x: '*', y: [true, false]});
    model.get('b.x').should.equal('*');
    model.get('b.y').should.deep.equal([true, false]);
    model.get('b.y[0]').should.equal(true);
    model.get('b.y[1]').should.equal(false);
    should.equal(model.get('b.y[2]'), undefined);
    should.equal(model.get('c'), undefined);
    should.equal(model.get('b.z'), undefined);
  });

  it('sets simple attribute', () => {
    let model = new DeepModel();
    let change = sandbox.spy();
    let changeA = sandbox.spy();
    model.on('change', change);
    model.on('change:a', changeA);

    let options = {};
    model.set('a', 1, options);
    model.get('a').should.equal(1);

    model.set({'a': 2}, options);
    model.get('a').should.equal(2);

    change.callCount.should.equal(2, 'change');
    change.args.should.deep.equal([
      [model, options],
      [model, options]
    ]);

    changeA.callCount.should.equal(2, 'change:a');
    changeA.args.should.deep.equal([
      [model, 1, options],
      [model, 2, options]
    ]);
  });

  it('sets nested attribute', () => {
    let model = new DeepModel({
      a: {b: {c: null}},
      x: {y: [true]}
    });
    let change = sandbox.spy();
    let changeA = sandbox.spy();
    let changeX = sandbox.spy();
    model.on('change', change);
    model.on('change:a', changeA);
    model.on('change:x', changeX);

    let options = {};
    model.set('a.b.c', 1, options);
    model.get('a.b.c').should.equal(1);

    model.set({'a.b.c': 2}, options);
    model.get('a.b.c').should.equal(2);

    model.set('a.b', {c: 3}, options);
    model.get('a.b.c').should.equal(3);

    model.set('x.y[0]', false);
    model.get('x.y[0]').should.equal(false);
    model.get('x').should.deep.equal({y: [false]});

    model.set('x.y[1]', 0);
    model.get('x.y[1]').should.equal(0);
    model.get('x').should.deep.equal({y: [false, 0]});

    change.callCount.should.equal(5, 'change');
    change.args.should.deep.equal(new Array(5).fill([model, options]));

    changeA.callCount.should.equal(3, 'change:a');
    changeA.args.should.deep.equal([
      [model, {b: {c: 1}}, options],
      [model, {b: {c: 2}}, options],
      [model, {b: {c: 3}}, options]
    ]);

    changeX.callCount.should.equal(2, 'change:x');
    changeX.args.should.deep.equal([
      [model, {y: [false]}, options],
      [model, {y: [false, 0]}, options]
    ]);
  });

  it('cannot set non-existent nested attribute', () => {
    (() => { new DeepModel().set('a.b', 1); }).should.throw(Error);
  });

  it('cannot set non-object nested attribute', () => {
    (() => { new DeepModel({a: 0}).set('a.b', 1); }).should.throw(Error);
    (() => { new DeepModel({a: {b: 0}}).set('a.b.c', 1); })
      .should.throw('"a.b.c" does not exist in {"a":{"b":0}}');
  });

});

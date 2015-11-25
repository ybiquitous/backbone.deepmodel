/* eslint-env mocha */
/* global should, sinon */
import DeepModel from '../lib/backbone.deepmodel';

describe('Backbone.DeepModel', () => {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
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
    class Model extends DeepModel {}
    let model = new Model({a: 1, b: {x: '*', y: [true, false]}});
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
    class Model extends DeepModel {}
    let model = new Model();
    let change = sandbox.spy();
    let changeA = sandbox.spy();
    model.on('change', change);
    model.on('change:a', changeA);

    let options = {};
    model.set('a', 1, options);
    model.get('a').should.equal(1);

    model.set({'a': 2}, options);
    model.get('a').should.equal(2);

    change.callCount.should.equal(2);
    change.args.should.deep.equal([
      [model, options],
      [model, options]
    ]);
    changeA.callCount.should.equal(2);
    changeA.args.should.deep.equal([
      [model, 1, options],
      [model, 2, options]
    ]);
  });

  it('sets nested attribute', () => {
    class Model extends DeepModel {}
    let model = new Model({a: {b: {c: null}}});
    let change = sandbox.spy();
    let changeA = sandbox.spy();
    model.on('change', change);
    model.on('change:a', changeA);

    let options = {};
    model.set('a.b.c', 1, options);
    model.get('a.b.c').should.equal(1);

    model.set({'a.b.c': 2}, options);
    model.get('a.b.c').should.equal(2);

    model.set('a.b', {c: 3}, options);
    model.get('a.b.c').should.equal(3);

    change.callCount.should.equal(3);
    change.args.should.deep.equal([
      [model, options],
      [model, options],
      [model, options]
    ]);
    changeA.callCount.should.equal(3);
    changeA.args.should.deep.equal([
      [model, {b: {c: 1}}, options],
      [model, {b: {c: 2}}, options],
      [model, {b: {c: 3}}, options]
    ]);
  });

});

/*eslint-env mocha */
import DeepModel from '../lib/backbone.deepmodel';

describe('Backbone.DeepModel', () => {

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

  it('gets nested attributes', () => {
    class Model extends DeepModel {}
    let model = new Model({a: 1, b: {x: '*'}});
    model.get('a').should.equal(1);
    model.get('b').should.deep.equal({x: '*'});
    model.get('b.x').should.equal('*');
  });

});

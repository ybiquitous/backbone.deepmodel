/*eslint-env mocha */
import DeepModel from '../lib/backbone.deepmodel';

describe('Backbone.DeepModel', () => {

  it('extends custom class by `extend` static method', () => {
    let Model = DeepModel.extend({
      initialize: function() {
        this.initialized = true;
      }
    });
    new Model().initialized.should.be.true;
  });

  it('extends custom class by `class` syntacs', () => {
    class Model extends DeepModel {
      initialize() {
        this.initialized = true;
      }
    }
    new Model().initialized.should.be.true;
  });

});

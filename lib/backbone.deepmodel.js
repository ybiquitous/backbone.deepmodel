import * as Backbone from 'backbone';
import * as objectPath from './object-path';

export default class DeepModel extends Backbone.Model {

  static extend(...args) {
    return super.extend(...args);
  }

  get(attr) {
    return objectPath.get(this.attributes, attr);
  }

  set(...args) {
    // TODO: implements
    return super.set(...args);
  }

}

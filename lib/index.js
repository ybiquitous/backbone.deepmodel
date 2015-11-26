import Backbone from 'backbone';
import * as objectPath from './object-path';
import deepCopy from './deep-copy';

export default class DeepModel extends Backbone.Model {

  static extend(...args) {
    return super.extend(...args);
  }

  static get VERSION() {
    return '0.0.1';
  }

  get(attr) {
    return objectPath.get(this.attributes, attr);
  }

  set(key, val, options) {
    // BEGIN: copy from original `set` method
    if (key == null) { return this; }

    // Handle both `"key", value` and `{key: value}` -style arguments.
    var attrs;
    if (typeof key === 'object') {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    options || (options = {});
    // END: copy from original `set` method

    Object.keys(attrs).forEach((attrPath) => {
      let pathElems = objectPath.parse(attrPath);
      if (pathElems.length === 0) {
        throw new Error(`${attrPath} is invalid attribute`);
      }

      let value = attrs[attrPath];
      let attr = pathElems[0];
      if (pathElems.length === 1) {
        super.set(attr, deepCopy(value), options);
      } else {
        value = objectPath
          .set(deepCopy(super.get(attr)), pathElems.slice(1), value);
        super.set(attr, value, options);
      }
    }, this);

    return this;
  }

}

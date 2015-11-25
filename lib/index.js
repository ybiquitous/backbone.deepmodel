import Backbone from 'backbone';
import * as objectPath from './object-path';
import deepCopy from './deep-copy';

export default class DeepModel extends Backbone.Model {

  static extend(...args) {
    return super.extend(...args);
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

    let target = deepCopy(this.attributes);
    Object.keys(attrs).forEach((key) => {
      objectPath.set(target, key, attrs[key]);
    });

    return super.set(target, options);
  }

}

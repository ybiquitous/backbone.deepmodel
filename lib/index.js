import Backbone from 'backbone';
import objectPath from './object-path';
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

    const newAttrs = Object.keys(attrs).reduce((target, path) => {
      const paths = objectPath.parse(path);
      if (paths.length === 1) {
        target[path] = attrs[path];
        return target;
      }

      const parentPath = paths.slice(0, -1);
      const obj = objectPath.get(this.attributes, parentPath);
      if (!obj) {
        throw new Error(`"${path}" does not exist in ${JSON.stringify(this)}`);
      }
      objectPath.set(target, parentPath, deepCopy(obj));

      return objectPath.set(target, paths, attrs[path]);
    }, {});

    return super.set(newAttrs, options);
  }

}

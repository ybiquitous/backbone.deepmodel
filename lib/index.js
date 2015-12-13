import Backbone from 'backbone';
import objectPath from './object-path';
import deepCopy from './deep-copy';

export default class DeepModel extends Backbone.Model {

  static get VERSION() {
    return '0.0.2';
  }

  get(attr) {
    return objectPath.get(this.attributes, attr);
  }

  set(key, value, options) {
    if (key == null) {
      return this;
    }

    let attrs;
    if (typeof key === 'object') {
      attrs = key;
      options = value;
    } else {
      attrs = {[key]: value};
    }

    const newAttrs = Object.keys(attrs).reduce((newObj, path) => {
      const paths = objectPath.parse(path);
      if (paths.length === 1) {
        newObj[path] = attrs[path];
        return newObj;
      }

      const parentPath = paths.slice(0, -1);
      const obj = objectPath.get(newObj, parentPath) ||
                  objectPath.get(this.attributes, parentPath);
      if (!obj) {
        throw new Error(`"${path}" does not exist in ${JSON.stringify(this)}`);
      }
      objectPath.set(newObj, parentPath, deepCopy(obj));

      return objectPath.set(newObj, paths, attrs[path]);
    }, {});

    return super.set(newAttrs, options);
  }

}

DeepModel.extend = Backbone.Model.extend;

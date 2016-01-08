import Backbone from 'backbone';
import objectPath from './object-path';
import deepCopy from './deep-copy';

const DEFAULTS = Object.freeze({
  pathSeparator: '.'
});

const _defaults = Object.assign({}, DEFAULTS);

function isObject(value) {
  return value !== null && typeof value === 'object';
}

export default class DeepModel extends Backbone.Model {

  static get VERSION() {
    return '0.1.2';
  }

  static defaults(settings = {}) {
    Object.assign(_defaults, settings === null ? DEFAULTS : settings);
  }

  get(attr) {
    objectPath.pathSeparator = _defaults.pathSeparator;
    return objectPath.get(this.attributes, attr);
  }

  set(key, value, options) {
    if (key == null) {
      return this;
    }

    const _ = objectPath;
    _.pathSeparator = _defaults.pathSeparator;

    let attrs;
    if (typeof key === 'object') {
      attrs = key;
      options = value;
    } else {
      if (!_.hasSeparator(key)) {
        return super.set(key, value, options);
      }
      attrs = {};
      attrs[key] = value;
    }

    const newAttrs = Object.keys(attrs).reduce((newObj, path) => {
      const paths = _.parse(path);

      if (paths.length === 1) {
        newObj[path] = attrs[path];
        return newObj;
      }

      const rootPath = paths[0];
      let obj = newObj[rootPath];
      if (obj == null) {
        obj = deepCopy(this.attributes[rootPath]);
      }
      if (!isObject(obj)) {
        throw new Error(`"${path}" does not exist in ${JSON.stringify(this)}`);
      }
      newObj[rootPath] = obj;

      return _.set(newObj, paths, attrs[path]);
    }, {});

    return super.set(newAttrs, options);
  }

}

DeepModel.extend = Backbone.Model.extend;

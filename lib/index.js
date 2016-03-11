import Backbone from 'backbone';
import objectPath from './object-path';
import deepCopy from './deep-copy';

const DEFAULTS = Object.freeze({
  pathSeparator: '.',
  pathParser: null
});

const _defaults = Object.assign({}, DEFAULTS);

function updateObjectPath() {
  objectPath.pathSeparator = _defaults.pathSeparator;

  const pathParser = _defaults.pathParser;
  if (typeof pathParser === 'function' || pathParser === null) {
    objectPath.pathParser = pathParser;
  }

  return objectPath;
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}

export default class DeepModel extends Backbone.Model {

  static get VERSION() { return '0.2.2'; }

  static defaults(settings = {}) {
    Object.assign(_defaults, settings === null ? DEFAULTS : settings);
  }

  get(attr) {
    return updateObjectPath().get(this.attributes, attr);
  }

  set(key, value, options) {
    if (key == null) {
      return this;
    }

    const _ = updateObjectPath();

    let attrs;
    if (typeof key === 'object') {
      attrs = key;
      options = value;
    } else {
      if (!_.pathParser && !_.hasSeparator(key)) {
        return super.set(key, value, options);
      }
      attrs = {};
      attrs[key] = value;
    }

    const newAttrs = Object.keys(attrs).reduce((newObj, path) => {
      const paths = _.parse(path);

      if (paths.length === 0) {
        return newObj;
      }
      if (paths.length === 1) {
        newObj[paths[0]] = attrs[path];
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

import Backbone from 'backbone'
import objectPath from './object-path'
import deepCopy from './deep-copy'

const DEFAULTS = Object.freeze({
  pathSeparator: '.',
  pathParser: null,
})

const defaults = Object.assign({}, DEFAULTS)

function updateObjectPath() {
  objectPath.pathSeparator = defaults.pathSeparator

  const { pathParser } = defaults
  if (typeof pathParser === 'function' || pathParser == null) {
    objectPath.pathParser = pathParser
  }

  return objectPath
}

function isObject(value) {
  return value != null && typeof value === 'object'
}

/**
 * @class
 * @see http://backbonejs.org/#Model
 *
 * @example
 * class Person extends DeepModel {...}
 *
 * // or
 * const Person = DeepModel.extend({...})
 */
export default class DeepModel extends Backbone.Model {
  /**
   * this module's version.
   */
  static get VERSION() {
    return '0.0.0'
  }

  /**
   * Update default settings.
   *
   * @param {Object} [settings={}] reset if `null`
   * @param {string} [settings.pathSeparator='/']
   * @param {function(path: string): Array.<string>} [settings.pathParser] ignore if returns `[]`
   * @returns {Object}
   *
   * @example
   * DeepModel.defaults({anySetting: true})
   * DeepModel.defaults(null) // reset!
   *
   * @example
   * DeepModel.defaults({pathSeparator: '/'})
   *
   * const model = new DeepModel()
   * model.set('a', {})
   * model.set('a/b', 1)
   * model.get('a/b') //=> 1
   *
   * @example
   * DeepModel.defaults({
   *   pathParser(path) {
   *     if (path === '*') { return [] } // ignore!
   *     return path.split('_')
   *   }
   * })
   *
   * const model = new DeepModel()
   * model.set('a', {})
   * model.set('a_b', 1)
   * model.get('a_b') //=> 1
   * model.set('*', 2)
   * model.get('*') //=> undefined
   */
  static defaults(settings = {}) {
    return Object.assign(defaults, settings == null ? DEFAULTS : settings)
  }

  /**
   * @see http://backbonejs.org/#Model-get
   * @override
   * @param {string} attribute
   * @returns {*}
   *
   * @example
   * model.get('a.b')
   */
  get(attribute) {
    return updateObjectPath().get(this.attributes, attribute)
  }

  /**
   * @see http://backbonejs.org/#Model-set
   * @override
   * @param {string} attribute
   * @param {*}      value
   * @param {Object} [options]
   * @returns {DeepModel}
   *
   * @example
   * model.set({'a.b': 'value'})
   * model.set('a.b', 'value')
   */
  set(attribute, value, options) {
    if (attribute == null) {
      return this
    }

    const _ = updateObjectPath()

    let attrs
    if (typeof attribute === 'object') {
      attrs = attribute
      options = value // eslint-disable-line no-param-reassign
    } else {
      if (!_.pathParser && !_.hasSeparator(attribute)) {
        return super.set(attribute, value, options)
      }
      attrs = {}
      attrs[attribute] = value
    }

    const newAttrs = Object.keys(attrs).reduce((newObj, path) => {
      const paths = _.parse(path)

      if (paths.length === 0) {
        return newObj
      }
      if (paths.length === 1) {
        newObj[paths[0]] = attrs[path] // eslint-disable-line no-param-reassign
        return newObj
      }

      const rootPath = paths[0]
      let obj = newObj[rootPath]
      if (obj == null) {
        obj = deepCopy(this.attributes[rootPath])
      }
      if (!isObject(obj)) {
        throw new Error(`"${path}" does not exist in ${JSON.stringify(this)}`)
      }
      newObj[rootPath] = obj // eslint-disable-line no-param-reassign

      return _.set(newObj, paths, attrs[path])
    }, {})

    return super.set(newAttrs, options)
  }
}

DeepModel.extend = Backbone.Model.extend

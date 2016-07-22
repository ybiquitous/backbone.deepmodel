import Backbone from 'backbone'
import objectPath from './object-path'
import deepCopy from './deep-copy'

const DEFAULTS = Object.freeze({
  pathSeparator: '.',
  pathParser: null
})

const _defaults = Object.assign({}, DEFAULTS)

function updateObjectPath () {
  objectPath.pathSeparator = _defaults.pathSeparator

  const pathParser = _defaults.pathParser
  if (typeof pathParser === 'function' || pathParser == null) {
    objectPath.pathParser = pathParser
  }

  return objectPath
}

function isObject (value) {
  return value != null && typeof value === 'object'
}

/**
 * @class
 * @see http://backbonejs.org/#Model
 *
 * @example
 * // ES5
 * var Person = DeepModel.extend({...})
 *
 * // ES2015(ES6)
 * class Person extends DeepModel {...}
 */
export default class DeepModel extends Backbone.Model {

  /**
   * this module's version.
   */
  static get VERSION () { return '0.3.2' }

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
   * let model = new DeepModel()
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
   * let model = new DeepModel()
   * model.set('a', {})
   * model.set('a_b', 1)
   * model.get('a_b') //=> 1
   * model.set('*', 2)
   * model.get('*') //=> undefined
   */
  static defaults (settings = {}) {
    return Object.assign(_defaults, settings == null ? DEFAULTS : settings)
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
  get (attribute) {
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
  set (attribute, value, options) {
    if (attribute == null) {
      return this
    }

    const _ = updateObjectPath()

    let attrs
    if (typeof attribute === 'object') {
      attrs = attribute
      options = value
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
        newObj[paths[0]] = attrs[path]
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
      newObj[rootPath] = obj

      return _.set(newObj, paths, attrs[path])
    }, {})

    return super.set(newAttrs, options)
  }

}

DeepModel.extend = Backbone.Model.extend

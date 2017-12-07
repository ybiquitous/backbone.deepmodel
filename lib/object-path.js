function ARRAY_PATTERN() {
  return /\[(\w+)]/g
}

function isArrayIndex(value) {
  const num = Number(value)
  return num >= 0 && num % 1 === 0
}

export default {
  pathSeparator: '.',

  /**
   * @param {?string} s
   * @returns {boolean}
   */
  hasSeparator(s) {
    return (
      typeof s === 'string' &&
      (s.indexOf(this.pathSeparator) >= 0 || ARRAY_PATTERN().test(s))
    )
  },

  /**
   * @param {string | string[]} path
   * @returns {string[]}
   *
   * @example
   * parse('a.b')      //=> ['a', 'b']
   * parse('a[0]')     //=> ['a', '0']
   * parse(['a', 'b']) //=> ['a', 'b']
   */
  parse(path) {
    if (Array.isArray(path)) {
      return path
    }
    if (typeof this.pathParser === 'function') {
      return this.pathParser(path)
    }
    if (!this.hasSeparator(path)) {
      return [path]
    }
    const sep = this.pathSeparator
    return path.replace(ARRAY_PATTERN(), `${sep}$1`).split(sep)
  },

  /**
   * @param {Object} obj
   * @param {string | string[]} path
   * @returns {?*}
   */
  get(obj, path) {
    const pathElements = this.parse(path)
    if (pathElements.length === 0) {
      return undefined
    }

    // TODO: Because of "Symbol is not defined", cannot use `for..of`
    let value = obj
    for (let i = 0, len = pathElements.length; i < len; i += 1) {
      const pathElement = pathElements[i]
      if (pathElement in value) {
        value = value[pathElement]
      } else {
        return undefined
      }
    }
    return value
  },

  /**
   * @param {Object} obj
   * @param {string | string[]} path
   * @param {*} value
   * @returns {Object} given `obj`
   */
  set(obj, path, value) {
    const pathElements = this.parse(path)
    const lastIndex = pathElements.length - 1
    pathElements.reduce((current, pathElement, index) => {
      /* eslint-disable no-param-reassign */
      if (index < lastIndex) {
        if (pathElement in current) {
          current = current[pathElement]
        } else {
          const newObj = isArrayIndex(pathElements[index + 1]) ? [] : {}
          current[pathElement] = newObj
          current = newObj
        }
      } else {
        current[pathElement] = value
      }
      return current
      /* eslint-enable no-param-reassign */
    }, obj)
    return obj
  },
}

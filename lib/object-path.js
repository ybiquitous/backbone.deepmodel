function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isArrayIndex(value) {
  const num = Number(value);
  return num >= 0 && num % 1 === 0;
}

const separator = '.';

export default {

  /**
   * @param {string | string[]} path
   * @returns {string[]}
   *
   * @example
   * parse('a.b') //=> ['a', 'b']
   */
  parse(path) {
    if (Array.isArray(path)) {
      return path;
    }
    return path.replace(/\[(\w+)\]/g, separator + '$1').split(separator);
  },

  /**
   * @param {Object} obj
   * @param {string | string[]} path
   * @returns {?Object}
   */
  get(obj, path) {
    const pathElements = this.parse(path);
    for (let i = 0, len = pathElements.length; i < len; i++) {
      const pathElement = pathElements[i];
      if (pathElement in obj) {
        obj = obj[pathElement];
      } else {
        return;
      }
    }
    return obj;
  },

  /**
   * @param {Object} obj
   * @param {string | string[]} path
   * @param {*} value
   * @returns {Object}
   */
  set(obj, path, value) {
    const pathElements = this.parse(path);
    const lastIndex = pathElements.length - 1;
    pathElements.reduce((current, pathElement, index) => {
      if (index < lastIndex) {
        let v = current[pathElement];
        if (!isObject(v)) {
          v = current[pathElement] =
            (isArrayIndex(pathElements[index + 1]) ? [] : {});
        }
        current = v;
      } else {
        current[pathElement] = value;
      }
      return current;
    }, obj);
    return obj;
  }

};

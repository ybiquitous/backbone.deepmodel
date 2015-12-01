/**
 * @param {string} path
 * @returns {string[]}
 */
export function parse(path) {
  return path.replace(/\[(\w+)\]/g, '.$1').split('.');
}

/**
 * @param {Object} obj
 * @param {string} path
 * @returns {Object}
 */
export function get(obj, path) {
  let pathElements = parse(path);
  for (let i = 0, len = pathElements.length; i < len; i++) {
    let pathElement = pathElements[i];
    if (pathElement in obj) {
      obj = obj[pathElement];
    } else {
      return;
    }
  }
  return obj;
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}

/**
 * @param {Object} obj
 * @param {string | string[]} path
 * @param {*} value
 * @returns {Object}
 */
export function set(obj, path, value) {
  let pathElements = Array.isArray(path) ? path : parse(path);
  let lastIndex = pathElements.length - 1;
  pathElements.reduce((current, pathElement, index) => {
    if (index < lastIndex) {
      let v = current[pathElement];
      if (!isObject(v)) {
        throw new Error(`"${pathElements.join('.')}"` +
                        ` in ${JSON.stringify(obj)}` +
                        ` must be an object`);
      }
      current = v;
    } else {
      current[pathElement] = value;
    }
    return current;
  }, obj);
  return obj;
}

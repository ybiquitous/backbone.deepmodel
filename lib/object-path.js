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

function isNumeric(value) {
  return /^\d+$/.test(value);
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
      let value = current[pathElement];
      if (!(value === undefined || typeof value === 'object')) {
        throw new Error(`${value} is not an object`);
      }

      // create new array or object if not exists
      if (value === undefined || value === null) {
        value = isNumeric(pathElements[index + 1]) ? [] : {};
        current[pathElement] = value;
      }
      current = value;
    } else {
      current[pathElement] = value;
    }
    return current;
  }, obj);
  return obj;
}

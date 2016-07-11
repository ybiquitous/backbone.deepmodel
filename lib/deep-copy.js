/**
 * @private
 * @param {Object|Array} [source]
 * @returns {Object|Array}
 */
export default function deepCopy (source) {
  if (typeof source !== 'object' || source == null) {
    return source
  }

  let initial = Array.isArray(source) ? [] : {}
  return Object.keys(source).reduce((copy, key) => {
    copy[key] = deepCopy(source[key])
    return copy
  }, initial)
}

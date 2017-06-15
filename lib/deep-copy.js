/**
 * @private
 * @param {Object|Array} [source]
 * @returns {Object|Array}
 */
export default function deepCopy(source) {
  if (typeof source !== 'object' || source == null) {
    return source
  }

  const initial = Array.isArray(source) ? [] : {}
  return Object.keys(source).reduce((copy, key) => (
    Object.assign(copy, { [key]: deepCopy(source[key]) })
  ), initial)
}

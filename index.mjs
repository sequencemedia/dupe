/**
 * @typedef {string | number | unknown[] | Record<PropertyKey, unknown> | null | undefined} ValueType
 */

/**
 * @param {ValueType} v
 * @returns {boolean}
 */
function isArray (v) {
  return Array.isArray(v)
}

/**
 * @param {ValueType} v
 * @returns {boolean}
 */
function isObject (v) {
  return (v || false) instanceof Object && !Array.isArray(v)
}

/**
 * @param {ValueType} v
 * @returns {boolean}
 */
function isFunction (v) {
  return v instanceof Function
}

/**
 * @param {ValueType} v
 * @returns {boolean}
 */
function isPrimitive (v) {
  return !isObject(v) && !isArray(v) && !isFunction(v)
}

/**
 * @param {Array<unknown>} v
 * @param {WeakMap<PropertyKey, unknown>} weakMap
 * @returns {Array<unknown>}
 */
function getArray (v, weakMap) {
  const a = []

  weakMap.set(v, a)

  return v.reduce(getReduceArray(weakMap), a)
}

/**
 * @param {Record<PropertyKey, unknown>} v
 * @param {WeakMap<PropertyKey, unknown>} weakMap
 * @returns {Record<PropertyKey, unknown>}
 */
function getObject (v, weakMap) {
  const o = {}

  weakMap.set(v, o)

  return Object.assign(o, Object.fromEntries(Object.entries(v).map(getMapEntries(weakMap))))
}

/**
 * @param {WeakMap<PropertyKey, unknown>} weakMap
 * @returns {(a: Array<unknown>, v: unknown) => Array<unknown>}
 */
function getReduceArray (weakMap) {
  /**
   * @param {Array<unknown>} a
   * @param {unknown} v
   * @returns {Array<unknown>}
   */
  return function reduceArray (a, v) {
    if (isPrimitive(v) || isFunction(v)) {
      a.push(v)
      return a
    }

    if (weakMap.has(v)) {
      a.push(weakMap.get(v))
      return a
    }

    if (isArray(v)) {
      a.push(getArray(v, weakMap))
      return a
    }

    if (isObject(v)) {
      a.push(getObject(v, weakMap))
      return a
    }
  }
}

/**
 * @param {WeakMap<PropertyKey, unknown>} weakMap
 * @returns {(entry: Array<PropertyKey, unknown>) => Array<PropertyKey, unknown>}
 */
function getMapEntries (weakMap) {
  /**
   * @param {Array<PropertyKey, unknown>} entry
   * @returns {Array<PropertyKey, unknown>}
   */
  return function mapEntries ([k, v]) {
    if (isPrimitive(v) || isFunction(v)) return [k, v]

    if (weakMap.has(v)) {
      return [k, weakMap.get(v)]
    }

    if (isArray(v)) {
      return [k, getArray(v, weakMap)]
    }

    if (isObject(v)) {
      return [k, getObject(v, weakMap)]
    }
  }
}

/**
 * Duplicate a value (using a `weakMap` in case of circular values)
 *
 * @param {ValueType} v
 * @param {WeakMap<PropertyKey, unknown>} weakMap
 * @returns {ValueType}
 */
function toDuplicate (v, weakMap) {
  if (isPrimitive(v) || isFunction(v)) return v

  if (isArray(v)) {
    return getArray(v, weakMap)
  }

  if (isObject(v)) {
    return getObject(v, weakMap)
  }
}

/**
 * Duplicate a value
 *
 * @param {ValueType} v
 * @returns {ValueType}
 */
export default function dupe (v) {
  return (
    toDuplicate(v, new WeakMap())
  )
}

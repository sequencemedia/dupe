/**
 *  @typedef {DupeTypes.ArrayLiteralType} ArrayLiteralType
 *  @typedef {DupeTypes.ObjectLiteralType} ObjectLiteralType
 *  @typedef {DupeTypes.ValueType} ValueType
 *  @typedef {DupeTypes.WeakMapType} WeakMapType
 */

/**
 *  @param {ValueType | ValueType[]} v
 *  @returns {boolean}
 */
function isArray (v) {
  return Array.isArray(v)
}

/**
 *  @param {ValueType | ValueType[]} v
 *  @returns {boolean}
 */
function isObject (v) {
  return (v || false) instanceof Object && !Array.isArray(v) && !Buffer.isBuffer(v)
}

/**
 *  @param {ValueType | ValueType[]} v
 *  @returns {boolean}
 */
function isFunction (v) {
  return v instanceof Function
}

/**
 *  @param {ValueType | ValueType[]} v
 *  @returns {boolean}
 */
function isBuffer (v) {
  return Buffer.isBuffer(v)
}

/**
 *  @param {ValueType | ValueType[]} v
 *  @returns {boolean}
 */
function isPrimitive (v) {
  return !(
    isObject(v) ||
    isArray(v) ||
    isFunction(v) ||
    isBuffer(v)
  )
}

/**
 *  function isArrayBuffer (v) {
 *    return v instanceof ArrayBuffer
 *  }
 */

/**
 *  @param {ArrayLiteralType} v
 *  @param {WeakMapType} weakMap
 *  @returns {ArrayLiteralType}
 */
function getArray (v, weakMap) {
  const a = []

  weakMap.set(v, a)
  return v.reduce(getReduceArray(weakMap), a)
}

/**
 *  @param {ObjectLiteralType} v
 *  @param {WeakMapType} weakMap
 *  @returns {ObjectLiteralType}
 */
function getObject (v, weakMap) {
  const o = {}

  weakMap.set(v, o)
  return Object.assign(o, Object.fromEntries(Object.entries(v).map(getMapEntries(weakMap))))
}

/**
 *  @param {Buffer} v
 *  @param {WeakMapType} weakMap
 *  @returns {Buffer}
 */
function getBuffer (v, weakMap) {
  const b = Buffer.from(v)

  weakMap.set(v, b)
  return b
}

/**
 *  @param {WeakMapType} weakMap
 *  @returns {(a: ArrayLiteralType, v: ValueType | ValueType[]) => ArrayLiteralType}
 */
function getReduceArray (weakMap) {
  /**
   *  @param {ArrayLiteralType} a
   *  @param {ValueType | ValueType[]} v
   *  @returns {ArrayLiteralType}
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

    if (isBuffer(v)) {
      a.push(getBuffer(v, weakMap))
      return a
    }
  }
}

/**
 *  @param {WeakMapType} weakMap
 *  @returns {(entry: [PropertyKey, ValueType | ValueType[]]) => [PropertyKey, ValueType | ValueType[]]}
 */
function getMapEntries (weakMap) {
  /**
   *  @param {[PropertyKey, ValueType | ValueType[]]} entry
   *  @returns {[PropertyKey, ValueType | ValueType[]]}
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

    if (isBuffer(v)) {
      return [k, getBuffer(v, weakMap)]
    }
  }
}

/**
 * Duplicate a value
 *
 *  @param {ValueType | ValueType[]} v
 *  @returns {ValueType | ValueType[]}
 */
export default function toDuplicate (v) {
  if (isPrimitive(v) || isFunction(v)) return v

  if (isArray(v)) {
    return getArray(v, new WeakMap())
  }

  if (isObject(v)) {
    return getObject(v, new WeakMap())
  }

  if (isBuffer(v)) {
    return getBuffer(v, new WeakMap())
  }
}

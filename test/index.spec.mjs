/**
 *  @typedef {DupeTypes.ArrayLiteralType} ArrayLiteralType
 *  @typedef {DupeTypes.ObjectLiteralType} ObjectLiteralType
 */

import {
  expect
} from 'chai'

import dupe from '@sequencemedia/dupe'

describe('`@sequencemedia/dupe`', () => {
  it('is a function', () => expect(dupe).to.be.a('function'))

  describe('`dupe()`', () => {
    /**
     *  String
     */
    it('returns a string', () => expect(dupe('abcdefghijklmnopqrstuvwxyz0123456789')).to.equal('abcdefghijklmnopqrstuvwxyz0123456789'))

    /**
     *  Number
     */
    it('returns a number', () => expect(dupe(1234567890)).to.equal(1234567890))

    /**
     *  Array
     */
    describe('Array', () => {
      describe('An array of numbers', () => {
        const v = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        it('returns an array with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same array', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An array of strings', () => {
        const v = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

        it('returns an array with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same array', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An array of arrays', () => {
        /**
         *  @type {ArrayLiteralType}
         */
        const a = []

        /**
         *  @type {ArrayLiteralType}
         */
        const b = []

        /**
         *  @type {ArrayLiteralType}
         */
        const c = [a, b]

        c.push(c)

        const v = [a, b, c]

        it('returns an array with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same array', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An array of objects', () => {
        /**
         *  @type {ObjectLiteralType}
         */
        const a = {}

        /**
         *  @type {ObjectLiteralType}
         */
        const b = {}

        /**
         *  @type {ObjectLiteralType & { c?: ObjectLiteralType }}
         */
        const c = { a, b }

        c.c = c

        const v = [a, b, c]

        it('returns an array with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same array', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An array of booleans', () => {
        const v = [true, false, true, false, true, false, true, false, true, false]

        it('returns an array with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same array', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An array of nulls', () => {
        const v = [null, null, null, null, null, null, null, null, null, null]

        it('returns an array with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same array', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An array of undefined', () => {
        const v = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

        it('returns an array with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same array', () => expect(dupe(v)).not.to.equal(v))
      })
    })

    /**
     *  Object
     */
    describe('Object', () => {
      describe('An object of numbers', () => {
        const v = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9 }

        it('returns an object with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same object', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An object of strings', () => {
        const v = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j' }

        it('returns an object with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same object', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An object of arrays', () => {
        /**
         *  @type {ArrayLiteralType}
         */
        const a = []

        /**
         *  @type {ArrayLiteralType}
         */
        const b = []

        /**
         *  @type {ArrayLiteralType & { c?: ArrayLiteralType }}
         */
        const c = [a, b]

        c.c = [c]

        const v = { a, b, c }

        it('returns an object with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same object', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An object of objects', () => {
        /**
         *  @type {ObjectLiteralType}
         */
        const a = {}

        /**
         *  @type {ObjectLiteralType}
         */
        const b = {}

        /**
         *  @type {ObjectLiteralType & { c?: ObjectLiteralType }}
         */
        const c = { a, b }

        c.c = c

        const v = { a, b, c }

        it('returns an object with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same object', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An object of booleans', () => {
        const v = { a: true, b: false, c: true, d: false, e: true, f: false, g: true, h: false, i: true, j: false }

        it('returns an array with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same object', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An object of nulls', () => {
        const v = { a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null, i: null, j: null }

        it('returns an object with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same object', () => expect(dupe(v)).not.to.equal(v))
      })

      describe('An object of undefined', () => {
        const v = { a: undefined, b: undefined, c: undefined, d: undefined, e: undefined, f: undefined, g: undefined, h: undefined, i: undefined, j: undefined }

        it('returns an object with the same structure', () => expect(dupe(v)).to.eql(v))

        it('is not the same object', () => expect(dupe(v)).not.to.equal(v))
      })
    })

    /**
     *  Boolean
     */
    it('returns a boolean', () => expect(dupe(true)).to.equal(true))

    /**
     *  Null
     */
    it('returns null', () => expect(dupe(null)).to.equal(null))

    /**
     *  Undefined
     */
    it('returns undefined', () => expect(dupe(undefined)).to.equal(undefined))
  })
})

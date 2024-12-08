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
        it('returns an array', () => expect(dupe([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
      })

      describe('An array of strings', () => {
        it('returns an array', () => expect(dupe(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'])).to.eql(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']))
      })

      describe('An array of arrays', () => {
        const a = []

        const b = []

        const c = [a, b]

        c.push(c)

        it('returns an array', () => expect(dupe([a, b, c])).to.eql([a, b, c]))
      })

      describe('An array of objects', () => {
        const a = {}

        const b = {}

        const c = { a, b }

        c.c = c

        it('returns an array', () => expect(dupe([a, b, c])).to.eql([a, b, c]))
      })

      describe('An array of booleans', () => {
        it('returns an array', () => expect(dupe([true, false, true, false, true, false, true, false, true, false])).to.eql([true, false, true, false, true, false, true, false, true, false]))
      })

      describe('An array of nulls', () => {
        it('returns an array', () => expect(dupe([null, null, null, null, null, null, null, null, null, null])).to.eql([null, null, null, null, null, null, null, null, null, null]))
      })

      describe('An array of undefined', () => {
        it('returns an array', () => expect(dupe([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined])).to.eql([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]))
      })
    })

    /**
     *  Object
     */
    describe('Object', () => {
      describe('An object of numbers', () => {
        it('returns an object', () => expect(dupe({ a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9 })).to.eql({ a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9 }))
      })

      describe('An object of strings', () => {
        it('returns an object', () => expect(dupe({ a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j' })).to.eql({ a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j' }))
      })

      describe('An object of arrays', () => {
        const a = []

        const b = []

        const c = [a, b]

        c.c = [c]

        it('returns an object', () => expect(dupe({ a, b, c })).to.eql({ a, b, c }))
      })

      describe('An object of objects', () => {
        const a = {}

        const b = {}

        const c = { a, b }

        c.c = c

        it('returns an object', () => expect(dupe({ a, b, c })).to.eql({ a, b, c }))
      })

      describe('An array of booleans', () => {
        it('returns an array', () => expect(dupe({ a: true, b: false, c: true, d: false, e: true, f: false, g: true, h: false, i: true, j: false })).to.eql({ a: true, b: false, c: true, d: false, e: true, f: false, g: true, h: false, i: true, j: false }))
      })

      describe('An array of nulls', () => {
        it('returns an object', () => expect(dupe({ a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null, i: null, j: null })).to.eql({ a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null, i: null, j: null }))
      })

      describe('An array of undefined', () => {
        it('returns an object', () => expect(dupe({ a: undefined, b: undefined, c: undefined, d: undefined, e: undefined, f: undefined, g: undefined, h: undefined, i: undefined, j: undefined })).to.eql({ a: undefined, b: undefined, c: undefined, d: undefined, e: undefined, f: undefined, g: undefined, h: undefined, i: undefined, j: undefined }))
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

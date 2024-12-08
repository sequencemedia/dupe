# `@sequencemedia/dupe`

Produces a duplicate (or deep clone) of an object or array, preserving circular references _in the duplicated values_, and preserving functions

Primitives are returned as-is

```javascript
import dupe from '@sequencemedia/dupe'

const a = [1, 2, 3]

a.push(a)

const o = { a: 4, b: 5, c: 6, func () { } }

o.o = o

a.push(o)

const array = dupe(a)
```

These types as well as `Buffer` instances can be duplicated using `@sequencemedia/dupe/node`

```javascript
import dupe from '@sequencemedia/dupe/node'

const a = [1, 2, 3, Buffer.from('x')]

a.push(a)

const o = { a: 4, b: 5, c: 6, func () { }, buff: Buffer.from('y') }

o.o = o

a.push(o)

const array = dupe(a)
```

For most values (i.e., except functions) `structuredClone` is preferable

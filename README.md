# `@sequencemedia/dupe`

Produces a duplicate (or deep clone) of an object or array, preserving circular references _in the duplicated values_, and preserving functions

Primitives are returned as-is

There is no special effort to identify `Buffer` or `ArrayBuffer` or typed arrays _etc_ in this version

For most values `structuredClone` is preferable, except where there are or may be functions involved

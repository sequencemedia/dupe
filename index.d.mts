declare global {
  namespace DupeTypes {
    export type ArrayLiteralType = unknown[] | never[]
    export type ObjectLiteralType = Record<PropertyKey, unknown> | Record<PropertyKey, never>
    export type ValueType = string | number | boolean | null | ArrayLiteralType | ObjectLiteralType | Buffer | undefined
    export type WeakMapType = WeakMap<WeakKey, ArrayLiteralType | ObjectLiteralType>
  }
}

export {}

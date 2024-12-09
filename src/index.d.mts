export type ArrayLiteralType = unknown[] | never[]
export type ObjectLiteralType = Record<PropertyKey, unknown> | Record<PropertyKey, never>
export type ValueType = string | number | ArrayLiteralType | ObjectLiteralType | null | undefined
export type WeakMapType = WeakMap<WeakKey, ArrayLiteralType | ObjectLiteralType>

export default function toDuplicate (v: ValueType | ValueType[]): ValueType | ValueType[]

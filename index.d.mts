type ArrayLiteralType = unknown[] | never[]
type ObjectLiteralType = Record<PropertyKey, unknown> | Record<PropertyKey, never>

type ValueType = string | number | ArrayLiteralType | ObjectLiteralType | Buffer | null | undefined

export default function dupe (v: ValueType | ValueType[]): ValueType | ValueType[]

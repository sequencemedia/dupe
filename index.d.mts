type ValueType = string | number | unknown[] | Record<PropertyKey, unknown> | null | undefined

export default function dupe (v: ValueType): ValueType

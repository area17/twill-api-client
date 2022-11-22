export type OrNull<Type> = Type | null
export type ToArray<Type> = Type extends unknown ? Type[] : never

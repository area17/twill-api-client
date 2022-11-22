import { camelCase, isObject } from 'lodash-es'

export function camelCaseKeys<Type>(
  object: Type,
  deep: boolean | null = false,
): Record<string, unknown> | Type {
  if (!isObject(object)) {
    return object
  }

  return (Object.entries(object) as []).reduce(
    (carry: Record<string, unknown>, entry) => {
      const key = camelCase(String(entry[0]))
      carry[key] = deep ? camelCaseKeys(entry[1]) : entry[1]
      return carry
    },
    {} as Record<string, unknown>,
  )
}

export default {}

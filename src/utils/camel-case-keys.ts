import { camelCase } from 'lodash-es'

const isObject = (value: any): boolean =>
  typeof value === 'object' &&
  value !== null &&
  !(value instanceof RegExp) &&
  !(value instanceof Error) &&
  !(value instanceof Date)

export function camelCaseKeys(object: any, deep: boolean | null = false): any {
  if (!isObject(object)) {
    return object
  }

  return Object.entries(object).reduce(
    (carry: Record<string, any>, [key, value]) => {
      const camelCasedKey = camelCase(String(key))

      carry[camelCasedKey] =
        deep && isObject(object) ? camelCaseKeys(value) : value

      return carry
    },
    {}
  )
}

export default {}

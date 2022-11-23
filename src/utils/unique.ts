import { map } from 'lodash-es'

export function unique<Type>(array: Type[], key: string): Array<unknown> {
  const values = Array.isArray(array) ? (map(array, key) as string[]) : []

  return [...new Set(values)]
}

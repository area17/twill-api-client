import { camelCase } from 'lodash-es';

const isObject = (value) =>
  typeof value === 'object' &&
  value !== null &&
  !(value instanceof RegExp) &&
  !(value instanceof Error) &&
  !(value instanceof Date);

export function camelCaseKeys(object, deep = false) {
  if (!isObject(object)) {
    return object;
  }

  return Object.entries(object).reduce((carry, [key, value]) => {
    carry[camelCase(String(key))] =
      deep && isObject(object) ? camelCaseKeys(value) : value;

    return carry;
  }, {});
}

import { expect, test } from 'vitest'
import { camelCaseKeys } from '../src/utils/camel-case-keys'
import { unique } from '../src/utils/unique'

test('camelCaseKeys', () => {
  const input = {
    foo_bar: 'foo',
    bar_baz: 'bar',
  }

  expect(camelCaseKeys(input)).toEqual({
    fooBar: 'foo',
    barBaz: 'bar',
  })
})

test('unique', () => {
  const input = [
    { foo: 'foo', bar: 'bar' },
    { foo: 'foo', bar: 'baz' },
    { foo: 'bar', bar: 'baz' },
  ]

  expect(unique(input, 'foo')).toEqual(['foo', 'bar'])
})

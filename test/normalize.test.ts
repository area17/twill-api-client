import {expect, test} from 'vitest'
import {normalize} from '../src/normalize'
import {NormalizedDataResponse, NormalizedErrorResponse} from "@/types";
import {data, error} from './response.test'

test('normalize', () => {
  const normalized = normalize(data) as NormalizedDataResponse
  expect(normalized).toBeTypeOf('object')
  expect(Object.keys(normalized)).toContain('result')
  expect(Object.keys(normalized)).toContain('resources')
  expect(Object.keys(normalized.resources)).toHaveLength(2)
  expect(normalized.result).toMatchObject([{type: 'pages', id: '1'}])
  expect(normalized).toMatchSnapshot()

  const normalizedError = normalize(error) as NormalizedErrorResponse
  expect(normalizedError).toBeTypeOf('object')
  expect(Object.keys(normalizedError)).toContain('errors')
})

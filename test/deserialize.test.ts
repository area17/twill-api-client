import {expect, test} from 'vitest'
import {normalize} from '../src/normalize'
import {deserialize} from '../src/deserialize'
import {data, error} from './response.test'

test('deserialize', () => {
  const normalized = normalize(data)
  const deserialized = deserialize(normalized.result, normalized.resources)
  expect(Array.isArray(deserialized)).toBe(true)
  expect(deserialized.length).toBe(1)
  expect(deserialized[0].attributes).toBeTypeOf('object')
  expect(deserialized[0].attributes.slug).toBe('slug')
  expect(deserialized[0].relationships).toBeTypeOf('object')
  expect(deserialized[0].relationships.blocks).toBeTypeOf('object')
  expect(deserialized[0].relationships.blocks.data).toHaveLength(1)
  expect(deserialized[0].relationships.blocks.links).toBeTypeOf('object')
  expect(deserialized).toMatchSnapshot()

  const blocks = deserialized[0].relationships.blocks
  expect(blocks.data[0].attributes.blockType).toBe('images')
})

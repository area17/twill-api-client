import { expect, test } from 'vitest'
import pages from './data/pages.json'
import { normalize } from '../src/normalize'
import { deserialize } from '../src/deserialize'

test('deserialize', () => {
  const normalized = normalize(pages)
  const deserialized = deserialize(normalized.result, normalized.resources)

  expect(deserialized).toMatchSnapshot()

  expect(Array.isArray(deserialized)).toBe(true)
  expect(deserialized.length).toBe(1)

  expect(deserialized[0].attributes).toBeTypeOf('object')
  expect(deserialized[0].attributes.slug).toBe('page-slug')
  expect(deserialized[0].relationships).toBeTypeOf('object')
  expect(deserialized[0].relationships.media.data).toBeTypeOf('undefined')
  expect(deserialized[0].relationships.media.links).toBeTypeOf('object')
  expect(deserialized[0].relationships.blocks.data).toHaveLength(3)
  expect(deserialized[0].relationships.blocks.links).toBeTypeOf('object')
  expect(deserialized[0].relationships.files.data).toHaveLength(2)

  const blocks = deserialized[0].relationships.blocks

  expect(blocks.data[0].attributes.blockType).toBe('interactive')
  expect(blocks.data[0].meta.browsers.interactive).toContain(1)
  expect(
    blocks.data[0].relationships.relatedItems.data[0].attributes.browserName ===
      'interactive',
  ).toBeTruthy()
  expect(
    blocks.data[0].relationships.relatedItems.data[0].relationships.related,
  ).toBeTypeOf('object')
})

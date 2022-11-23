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

  expect(deserialized[0].slug).toBe('page-slug')
  expect(deserialized[0].attributes).toBeTypeOf('undefined')
  expect(deserialized[0].relationships).toBeTypeOf('undefined')
  expect(deserialized[0].media).toBeTypeOf('undefined')
  expect(deserialized[0].blocks).toHaveLength(3)
  expect(deserialized[0].files).toHaveLength(1)

  const blocks = deserialized[0].blocks

  expect(blocks[0].blockType).toBe('interactive')
  expect(blocks[0].meta.browsers.interactive).toContain(1)
  expect(blocks[0].relatedItems[0].browserName === 'interactive').toBeTruthy()
  expect(blocks[0].relatedItems[0].related).toBeTypeOf('object')
})

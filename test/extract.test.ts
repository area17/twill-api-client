import { expect, test } from 'vitest'
import pages from './data/pages.json'
import { normalize } from '../src/normalize'
import { deserialize } from '../src/deserialize'
import { extract } from '../src/extract'

test('extract files', () => {
  const normalized = normalize(pages)
  const deserialized = deserialize(normalized.result, normalized.resources)
  const extracted = extract(deserialized[0])
  const deserializedWithCallback = deserialize(
    normalized.result,
    normalized.resources,
    0,
    extract,
  )

  expect(Object.keys(extracted)).toMatchInlineSnapshot(`
  [
    "blocks",
    "files",
  ]
  `)

  expect(extracted).toMatchSnapshot()

  expect(deserializedWithCallback).toMatchSnapshot()
})

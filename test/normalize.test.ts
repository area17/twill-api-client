import { expect, test } from 'vitest'
import pages from './data/pages.json'
import { normalize } from '../src/normalize'
import {JsonApiDataResponse } from "../src";

test('normalize', () => {
  const normalized = normalize(pages as unknown as JsonApiDataResponse)

  expect(normalized).toMatchSnapshot()

  const keys = Object.keys(normalized)

  expect(keys).toContain('result')

  expect(keys).toContain('resources')

  expect(Object.values(normalized.result)).toMatchInlineSnapshot(`
    [
      {
        "id": "1",
        "type": "pages",
      },
    ]
  `)

  expect(Object.keys(normalized.resources)).toMatchInlineSnapshot(`
    [
      "pages",
      "blocks",
      "relatedItems",
      "interactives",
      "media",
      "files",
    ]
  `)
})

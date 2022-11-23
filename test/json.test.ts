import { assert, expect, test } from 'vitest'
import pages from './data/pages.json'

test('JSON', () => {
  expect(typeof pages).toBe('object')

  const output = JSON.stringify(pages)

  expect(output).toMatchSnapshot()
  assert.deepEqual(JSON.parse(output), pages, 'matches original')
})

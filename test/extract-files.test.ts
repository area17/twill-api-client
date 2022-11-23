import { expect, test } from 'vitest'
import pages from './data/pages.json'
import { normalize } from '../src/normalize'
import { deserialize } from '../src/deserialize'
import { files, fileRoles } from '../src/extract/files'

test('extract files', () => {
  const normalized = normalize(pages)
  const deserialized = deserialize(normalized.result, normalized.resources)

  const fileResources = files(deserialized[0])

  expect(Object.keys(fileResources)).toHaveLength(1)
  expect(Object.keys(fileResources)).toContain('videoSrc')
  expect(fileResources.videoSrc).toHaveLength(2)

  const roles = fileRoles(deserialized[0])

  expect(roles).toHaveLength(1)
  expect(roles).toContain('video_src')
})
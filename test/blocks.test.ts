import { test, expect } from 'vitest'
import { data as jsonData } from './response.test'
import { normalize } from '../src/normalize'
import { deserialize } from '../src/deserialize'
import { blocks } from '../src/helpers/blocks'

test('blocks', () => {
  const blocksRelationship = {
    links: {
      self: '#',
      related: '#',
    },
    data: [
      {
        type: 'blocks',
        id: '1',
      },
      {
        type: 'blocks',
        id: '2',
      },
      {
        type: 'blocks',
        id: '3',
      },
      {
        type: 'blocks',
        id: '4',
      },
    ],
    meta: {
      editors: {
        default: ['1', '2', '4'],
        extra: ['3'],
      },
    },
  }

  const blocksResources: any = [
    {
      type: 'blocks',
      id: '1',
      attributes: {
        blockType: 'images',
        editorName: 'default',
        childKey: null,
        position: 1,
        content: {},
      },
    },
    {
      type: 'blocks',
      id: '2',
      attributes: {
        blockType: 'text',
        editorName: 'default',
        childKey: null,
        position: 2,
        content: {},
      },
    },
    {
      type: 'blocks',
      id: '3',
      attributes: {
        blockType: 'text',
        editorName: 'extra',
        childKey: null,
        position: 1,
        content: {},
      },
    },
    {
      type: 'blocks',
      id: '4',
      attributes: {
        blockType: 'gallery',
        editorName: 'default',
        childKey: null,
        position: 3,
        content: {},
      },
    },
  ]

  const data = {
    ...jsonData,
    included: blocksResources,
  }
  data.data[0].relationships.blocks = blocksRelationship

  const normalized = normalize(data)
  const deserialized = deserialize(normalized.result, normalized.resources)
  expect(Array.isArray(deserialized)).toBeTruthy()

  const resource = deserialized.pop()
  expect(resource.type).toBe('pages')
  expect(resource.relationships.blocks.data).toHaveLength(4)
  expect(resource.relationships.blocks.meta.editors).toMatchInlineSnapshot(`
    {
      "default": [
        "1",
        "2",
        "4",
      ],
      "extra": [
        "3",
      ],
    }
  `)

  const resourceBlocks = blocks(resource)
  expect(Object.keys(resourceBlocks)).toContain('default')
  expect(resourceBlocks.default).toHaveLength(3)
  expect(Object.keys(resourceBlocks)).toContain('extra')
  expect(resourceBlocks.extra).toHaveLength(1)
})

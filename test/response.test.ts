import {expect, test} from 'vitest'

export const data = {
  jsonapi: {
    version: "1.0"
  },
  data: [
    {
      type: 'pages',
      id: "1",
      attributes: {
        slug: 'slug'
      },
      relationships: {
        blocks: {
          links: {
            self: '#',
            related: '#'
          },
          data: [
            {
              type: 'blocks',
              id: "1"
            }
          ],
          meta: {
            editors: {
              default: [
                "1"
              ]
            }
          }
        }
      },
      links: {
        self: '#'
      }
    }
  ],
  included: [
    {
      type: 'blocks',
      id: "1",
      attributes: {
        blockType: 'images',
        position: 1,
      },
      links: {
        self: "#"
      }
    }
  ]
}

export const error = {
  jsonapi: {
    version: "1.0"
  },
  errors: [
    {
      detail: "Include path is not allowed.",
      source: {
        parameter: "include"
      },
      status: "400",
      title: "Invalid Query Parameter"
    }
  ]
}

test('response', () => {
  expect(data).toBeTypeOf('object')
  expect(JSON.stringify(data)).toBeTruthy()

  expect(error).toBeTypeOf('object')
  expect(JSON.stringify(error)).toBeTruthy()
})

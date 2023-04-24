import {expect, test} from 'vitest'
import {normalize} from '../src/normalize'
import {NormalizedDataResponse, NormalizedErrorResponse} from "@/types";

test('normalize', () => {
  const data = {
    jsonapi: {
      version: "1.0"
    },
    data: [
      {
        type: 'pages',
        id: "1",
        relationships: {
          blocks: {
            links: {
              self: '#',
              related: '#'
            },
            data: undefined,
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
        id: "1"
      }
    ]
  }

  const error = {
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

  const normalized = normalize(data) as NormalizedDataResponse
  const normalizedError = normalize(error) as NormalizedErrorResponse

  expect(Object.keys(normalized)).toContain('result')
  expect(Object.keys(normalized)).toContain('resources')
  expect(Object.keys(normalizedError)).toContain('errors')
  expect(Object.keys(normalized.resources)).toHaveLength(2)
  expect(normalized.result).toMatchObject([{type: 'pages', id: '1'}])
  expect(normalized).toMatchSnapshot()
})

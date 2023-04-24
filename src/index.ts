import { QueryBuilder } from '@/query-builder'
import {ID, JsonApiDataResponse, JsonApiResource, NormalizedErrorResponse, Resource} from '@/types'
import { normalize } from '@/normalize'
import { deserialize } from '@/deserialize'
import { blocks } from '@/helpers/blocks'
import { media } from '@/helpers/media'
import { files } from '@/helpers/files'
import { browsers } from '@/helpers/related-items'

export * from '@/types'

export interface TwillOptions {
  url: string
  token?: string
  prefix: string
  version: string
}

export interface Headers {
  [key: string]: string
}

export const Twill = (options: TwillOptions) => {
  const { url, prefix, version, token } = options
  const baseURL = `${url}${prefix}/${version}`

  const headers: Headers = {
    Accept: 'application/vnd.api+json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const get = (path: string): QueryBuilder => {
    return new QueryBuilder({ path, headers })
  }

  const find = (resource: string) =>
    new QueryBuilder({
      path: resource,
      baseURL,
      headers,
    })

  const findOne = (resource: string, id: ID | number) =>
    new QueryBuilder({
      path: `${resource}/${id}`,
      baseURL,
      headers,
    })

  const findRelated = (
    resource: string,
    response: JsonApiResource,
  ): QueryBuilder | null => {
    const path = response.relationships[resource]?.links?.related

    if (!path) {
      return null
    }

    return new QueryBuilder({ path, headers })
  }

  const findRelationship = (
    resource: string,
    response: JsonApiResource,
  ): QueryBuilder | null => {
    const path = response.relationships[resource]?.links?.self

    if (!path) {
      return null
    }

    return new QueryBuilder({ path, headers })
  }

  const transform = (response: JsonApiDataResponse): Resource[] => {
    const isError = (x: any): x is NormalizedErrorResponse => !!x.errors
    const normalized = normalize(response)

    if (isError(normalized)) {
      return [] as Resource[]
    }

    return deserialize(
      normalized.result,
      normalized.resources,
      0,
    ) as Resource[]
  }

  return {
    get,
    find,
    findOne,
    findRelated,
    findRelationship,
    normalize,
    deserialize,
    helpers: {
      getBlocks: blocks,
      getMedia: media,
      getFiles: files,
      getBrowsers: browsers
    },
    transform,
  }
}

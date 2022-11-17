import { QueryBuilder } from './QueryBuilder'
import { type ID, type DataResponse, type Resource } from './types/jsonapi'
// @ts-ignore
import { normalize } from './normalize.js'
// @ts-ignore
import { deserialize } from './deserialize'
// @ts-ignore
import { blocks } from '@/extract/blocks.js'
// @ts-ignore
import { images } from '@/extract/images.js'

export interface TwillOptions {
  url: string
  token: string
  prefix: string
  version: string
}

export const Twill = (options: TwillOptions) => {
  const { url, prefix, version, token } = options
  const baseURL = `${url}${prefix}/${version}`

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.api+json'
  }

  const get = (path: string) => {
    return new QueryBuilder({ path, headers })
  }

  const find = (resource: string) =>
    new QueryBuilder({
      path: resource,
      baseURL,
      headers
    })

  const findOne = (resource: string, id: ID | number | number) =>
    new QueryBuilder({
      path: `${resource}/${id}`,
      baseURL,
      headers
    })

  const findRelated = (
    resource: string,
    response: Resource
  ): QueryBuilder | null => {
    const path = response.relationships[resource]?.links?.related

    if (!path) {
      return null
    }

    return new QueryBuilder({ path, headers })
  }

  const findRelationship = (
    resource: string,
    response: Resource
  ): QueryBuilder | null => {
    const path = response.relationships[resource]?.links?.self

    if (!path) {
      return null
    }

    return new QueryBuilder({ path, headers })
  }

  const extract = (resource: Resource) => {
    return {
      images: images(resource),
      editors: blocks(resource)
    }
  }

  const transform = (response: DataResponse) => {
    const normalized = normalize(response)
    const resources: any = deserialize(normalized.result, normalized.resources)
    return resources.map((resource: any) => {
      return {
        ...resource,
        ...extract(resource)
      }
    })
  }

  return {
    get,
    find,
    findOne,
    findRelated,
    findRelationship,
    normalize,
    deserialize,
    extract,
    transform
  }
}

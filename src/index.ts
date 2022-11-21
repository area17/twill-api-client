import { QueryBuilder } from './query-builder'
import {
  ID,
  JsonApiDataResponse,
  JsonApiResource,
  DeserializedResource
} from './types'
import { normalize } from './normalize'
import { deserialize } from './deserialize'
import { blocks } from './extract/blocks'
// @ts-ignore
import { images } from './extract/images'

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

  const get = (path: string): QueryBuilder => {
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
    response: JsonApiResource
  ): QueryBuilder | null => {
    const path = response.relationships[resource]?.links?.related

    if (!path) {
      return null
    }

    return new QueryBuilder({ path, headers })
  }

  const findRelationship = (
    resource: string,
    response: JsonApiResource
  ): QueryBuilder | null => {
    const path = response.relationships[resource]?.links?.self

    if (!path) {
      return null
    }

    return new QueryBuilder({ path, headers })
  }

  const extract = (resource: DeserializedResource) => {
    return {
      images: images(resource),
      editors: blocks(resource)
    }
  }

  const transform = (response: JsonApiDataResponse) => {
    const normalized = normalize(response)
    const resources: DeserializedResource[] = deserialize(
      normalized.result,
      normalized.resources
    ) as DeserializedResource[]
    return resources.map((resource: DeserializedResource) => {
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

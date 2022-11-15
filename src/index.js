import { QueryBuilder } from './QueryBuilder.js'
import { normalize } from './normalize.js'
import { deserialize } from './deserialize'
import { allImages } from './extract/images.js'
import { allBlocks } from './extract/blocks.js'

const Twill = ({ url, prefix, version, token }) => {
  const baseURL = `${url}${prefix}/${version}`

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.api+json'
  }

  const get = (path) => {
    return new QueryBuilder({ path, headers })
  }

  const find = (resource) =>
    new QueryBuilder({
      path: resource,
      baseURL,
      headers
    })

  const findOne = (resource, id) =>
    new QueryBuilder({
      path: `${resource}/${id}`,
      baseURL,
      headers
    })

  const findRelated = (resource, response) => {
    const path = response.relationships[resource].links.related

    return new QueryBuilder({ path, headers })
  }

  const findRelationship = (resource, response) => {
    const path = response.relationships[resource].links.self

    return new QueryBuilder({ path, headers })
  }

  const extract = (resource) => {
    return {
      images: allImages(resource),
      editors: allBlocks(resource)
    }
  }

  const transform = (response) => {
    const normalized = normalize(response)
    const resources = deserialize(normalized.result, normalized.resources)
    return resources.map((resource) => {
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

export { Twill }

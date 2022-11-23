import { camelCase, isEmpty } from 'lodash-es'
import {
  Resource,
  ID,
  JsonApiRelatedResource,
  JsonApiResource,
  NormalizedStore,
} from '@/types'
import { camelCaseKeys } from '@/utils/camel-case-keys'

const MAX_DEPTH = 6

function deserializeRelationships(
  resources: JsonApiRelatedResource[],
  store: NormalizedStore,
  depth: number,
  callback?: (resource: Resource) => void,
): Resource[] {
  return resources
    .map((resource) =>
      deserializeRelationship(resource, store, depth, callback),
    )
    .filter((resource) => !!resource)
}

function deserializeRelationship(
  resource: JsonApiRelatedResource,
  store: NormalizedStore,
  depth: number,
  callback?: (resource: Resource) => void,
): Resource {
  return deserialize(resource, store, depth, callback) as Resource
}

export function deserializeMany<Type extends { type: string; id: ID }>(
  result: Type[],
  store: NormalizedStore,
  depth = 0,
  callback?: (resource: Resource) => void,
): Resource[] {
  return result.map((resource) =>
    deserializeOne(resource, store, depth, callback),
  )
}

export function deserializeOne<Type extends { type: string; id: ID }>(
  result: Type,
  store: NormalizedStore,
  depth = 0,
  callback?: (resource: Resource) => void,
): Resource {
  const serializedResource: JsonApiResource =
    store[camelCase(result.type)][result.id]

  if (typeof depth == 'number') {
    depth++
  } else {
    depth = 1
  }

  /**
   * If max depth is reached, simply return the serialized resource
   */
  if (depth > MAX_DEPTH) {
    return { ...serializedResource } as Resource
  }

  let resource: Resource = {
    type: serializedResource.type,
    meta: serializedResource.meta,
    id: serializedResource.id,
    ...camelCaseKeys(serializedResource.attributes),
  }

  if (serializedResource.relationships) {
    resource = Object.keys(serializedResource.relationships).reduce(
      (acc, key) => {
        const data = serializedResource.relationships[key].data
        let relationship

        if (!isEmpty(data)) {
          relationship = Array.isArray(data)
            ? deserializeRelationships(data, store, depth, callback)
            : deserializeRelationship(data, store, depth, callback)
        }

        return {
          ...acc,
          [camelCase(key)]: relationship ?? data,
        }
      },
      resource,
    )
  }

  if (callback) {
    resource = { ...resource, ...(callback(resource) as unknown as Resource) }
  }

  return resource
}

export function deserialize<Type extends { type: string; id: ID }>(
  result: Type[] | Type,
  store: NormalizedStore,
  depth = 0,
  callback?: (resource: Resource) => void,
): Resource | Resource[] {
  if (Array.isArray(result)) {
    return deserializeMany(result, store, depth, callback)
  }
  return deserializeOne(result, store, depth, callback)
}

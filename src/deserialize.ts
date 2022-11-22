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
): Resource[] {
  return resources
    .map((resource) => deserializeRelationship(resource, store, depth))
    .filter((resource) => !!resource)
}

function deserializeRelationship(
  resource: JsonApiRelatedResource,
  store: NormalizedStore,
  depth: number,
): Resource {
  return deserialize(resource, store, depth) as Resource
}

export function deserialize<Type extends { type: string; id: ID }>(
  result: Type[] | Type,
  store: NormalizedStore,
  depth = 0,
): Resource | Resource[] {
  if (Array.isArray(result)) {
    return result.map((result) => deserialize(result, store, depth) as Resource)
  }

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
            ? deserializeRelationships(data, store, depth)
            : deserializeRelationship(data, store, depth)
        }

        return {
          ...acc,
          [camelCase(key)]: relationship ?? data,
        }
      },
      resource,
    )
  }

  return resource
}

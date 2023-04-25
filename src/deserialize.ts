import { camelCase, isEmpty } from 'lodash-es'
import {
  Resource,
  ID,
  JsonApiRelatedResource,
  JsonApiResource,
  NormalizedStore,
} from '@/types'
import { camelCaseKeys } from '@/utils/camel-case-keys'

const MAX_DEPTH = 10

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

export function deserializeMany<Type extends { type: string; id: ID }>(
  result: Type[],
  store: NormalizedStore,
  depth = 0,
): (Resource | null)[] {
  return result.map((resource) => deserializeOne(resource, store, depth))
}

export function deserializeOne<Type extends { type: string; id: ID }>(
  result: Type,
  store: NormalizedStore,
  depth = 0,
): Resource | null {
  if (
    !result.type ||
    typeof result.id === 'undefined' ||
    !store[camelCase(result.type)] ||
    typeof store[camelCase(result.type)][result.id] === 'undefined'
  ) {
    return null
  }

  const serializedResource: JsonApiResource =
    store[camelCase(result.type)][result.id]

  depth++

  /**
   * If max depth is reached, simply return the serialized resource
   */
  if (depth > MAX_DEPTH) {
    return { ...serializedResource } as Resource
  }

  const resource: Resource = {
    ...serializedResource,
  }

  if (serializedResource.attributes) {
    resource.attributes = camelCaseKeys(serializedResource.attributes)
  }

  if (serializedResource.relationships) {
    resource.relationships = Object.keys(
      serializedResource.relationships,
    ).reduce((acc, key) => {
      const relationship = serializedResource.relationships[key]
      let data

      if (!isEmpty(relationship.data)) {
        data = Array.isArray(relationship.data)
          ? deserializeRelationships(relationship.data, store, depth)
          : deserializeRelationship(relationship.data, store, depth)
      }

      return {
        ...acc,
        [camelCase(key)]: {
          ...relationship,
          data,
        },
      }
    }, {})
  }

  return resource
}

export function deserialize<Type extends { type: string; id: ID }>(
  result: Type[] | Type,
  store: NormalizedStore,
  depth = 0,
): (Resource | null) | (Resource | null)[] {
  if (Array.isArray(result)) {
    return deserializeMany(result, store, depth)
  }
  return deserializeOne(result, store, depth)
}

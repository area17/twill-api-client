import { camelCase, isEmpty } from 'lodash-es'
import { camelCaseKeys } from './utils/camel-case-keys'

const MAX_DEPTH = 6

function deserializeRelationships(resources = [], store, depth) {
  return resources
    .map((resource) => deserializeRelationship(resource, store, depth))
    .filter((resource) => !!resource)
}

function deserializeRelationship(resource = {}, store, depth) {
  if (
    typeof resource === 'object' &&
    resource?.type &&
    store[camelCase(resource.type)] &&
    store[camelCase(resource.type)][resource.id]
  ) {
    return deserialize(
      store[camelCase(resource.type)][resource.id],
      store,
      depth
    )
  }

  return null
}

export function deserialize(result, store, depth) {
  if (Array.isArray(result)) {
    return result.map((item) => deserialize(item, store, depth))
  }

  const { id, type, attributes, relationships, meta } =
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
    return { id, type, attributes, relationships, meta }
  }

  let resource = {
    type,
    meta,
    id,
    ...camelCaseKeys(attributes)
  }

  if (relationships) {
    try {
      resource = Object.keys(relationships).reduce((resource, key) => {
        return {
          ...resource,
          [camelCase(key)]: !isEmpty(relationships[key].data)
            ? Array.isArray(relationships[key].data)
              ? deserializeRelationships(relationships[key].data, store, depth)
              : deserializeRelationship(relationships[key].data, store, depth)
            : relationships[key].data
        }
      }, resource)
    } catch (err) {
      console.log(err)
    }
  }

  return resource
}

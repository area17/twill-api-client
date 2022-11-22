import { camelCase } from 'lodash-es'
import { camelCaseKeys } from './utils/camel-case-keys'
import {
  NormalizedResult,
  NormalizedStore,
  JsonApiRelationship,
  JsonApiDataResponse,
  JsonApiResource,
  JsonApiRelatedResource,
} from './types'

/**
 * Normalize the JSON:API response into categories by resource type
 * and indexed by the resource's ID.
 */
export function normalize(response: JsonApiDataResponse): {
  result: NormalizedResult[]
  resources: NormalizedStore
} {
  let data

  if (Array.isArray(response.data)) {
    data = response.data
  } else {
    data = [response.data]
  }

  const included = response.included || []

  const result: NormalizedResult[] = []
  const resources: NormalizedStore = {}

  data.forEach((resource) => {
    addResult(result, resource)
    addResource(resources, resource)
  })

  included.forEach((resource) => {
    addResource(resources, resource)
  })

  return {
    result,
    resources,
  }
}

function addResult(result: NormalizedResult[], resource: JsonApiResource) {
  const { type, id } = resource

  result.push({ type, id })
}

function addResource(resources: NormalizedStore, resource: JsonApiResource) {
  const { type, id, attributes, meta, links, relationships } = resource

  const resourceType = camelCase(type)

  if (!resources[resourceType]) resources[resourceType] = {}

  resources[resourceType][id] = {
    id,
    type,
    attributes: camelCaseKeys(attributes || {}),
    relationships: extractRelationships(relationships) || {},
    meta,
    links,
  }

  return resources
}

function extractRelationships(responseRelationships: {
  [key: string]: JsonApiRelationship<JsonApiRelatedResource>
}): Record<string, JsonApiRelationship<JsonApiRelatedResource>> | undefined {
  if (!responseRelationships) {
    return undefined
  }

  const relationships: Record<
    string,
    JsonApiRelationship<JsonApiRelatedResource>
  > = {}

  Object.keys(responseRelationships).map((type) => {
    const relationshipType = camelCase(type)
    relationships[relationshipType] = responseRelationships[type]
  })

  return relationships
}

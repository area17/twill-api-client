import { camelCase } from 'lodash-es'
import { camelCaseKeys } from './utils/camel-case-keys'
import { type NormalizedResult, type NormalizedStore } from './types/resources'
import { Relationship, type DataResponse, type Resource } from './types/jsonapi'

/**
 * Normalize the JSON:API response into categories by resource type
 * and indexed by the resource's ID.
 */
export function normalize(response: DataResponse): {
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

  let result: NormalizedResult[] = []
  let resources: NormalizedStore = {}

  data.forEach((resource) => {
    addResult(result, resource)
    addResource(resources, resource)
  })

  included.forEach((resource) => {
    addResource(resources, resource)
  })

  return {
    result,
    resources
  }
}

function addResult(result: NormalizedResult[], resource: Resource) {
  const { type, id } = resource

  result.push({ type, id })
}

function addResource(resources: NormalizedStore, resource: Resource) {
  const { type, id, attributes, meta, links, relationships } = resource

  const resourceType = camelCase(type)

  if (!resources[resourceType]) resources[resourceType] = {}

  resources[resourceType][id] = {
    id,
    type,
    attributes: camelCaseKeys(attributes || {}),
    relationships: extractRelationships(relationships) || {},
    meta,
    links
  }

  return resources
}

function extractRelationships(responseRelationships: {
  [key: string]: Relationship
}): Record<string, Relationship> | undefined {
  if (!responseRelationships) {
    return undefined
  }

  let relationships: Record<string, Relationship> = {}

  Object.keys(responseRelationships).map((type) => {
    const relationshipType = camelCase(type)
    relationships[relationshipType] = responseRelationships[type]
  })

  return relationships
}

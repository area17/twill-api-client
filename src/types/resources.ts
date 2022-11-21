import { ID, JsonApiResource } from './json-api'
import { OrNull } from './utils'

/**
 * Normalized resource
 */
export interface NormalizedResult {
  type: string
  id: ID
}

export interface NormalizedStore {
  [key: string]: NormalizedResources
}

export interface NormalizedResources {
  [key: ID]: JsonApiResource
}

/**
 * Deserialized resource
 */
export interface DeserializedResource extends Record<string, unknown> {
  id: ID
  type: string
  meta?: Record<string, any>
}

export interface HasBlocks {
  blocks: OrNull<DeserializedResource[]>
}

export interface HasRelatedItems {
  relatedItems: OrNull<DeserializedResource[]>
}

export interface HasMedia {
  media: OrNull<DeserializedResource[]>
}

export interface HasFiles {
  files: OrNull<DeserializedResource[]>
}

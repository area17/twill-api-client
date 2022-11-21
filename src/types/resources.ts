import { type ID, type Resource } from './jsonapi'

export interface NormalizedResult {
  type: string
  id: ID
}

export interface NormalizedStore {
  [key: string]: NormalizedResources
}

export interface NormalizedResources {
  [key: ID]: NormalizedResource
}

export interface NormalizedResource extends Resource {}

/**
 * Deserialized resource
 */
export interface DeserializedResource extends Record<string, unknown> {
  id: ID
  type: string
  meta?: Record<string, any>
}

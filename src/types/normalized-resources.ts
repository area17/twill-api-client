import { ID, JsonApiError, JsonApiResource } from '@/types'

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

export interface NormalizedDataResponse {
  result: NormalizedResult[]
  resources: NormalizedStore
}

export interface NormalizedErrorResponse {
  errors: JsonApiError[]
}

export type NormalizedResponse =
  | NormalizedDataResponse
  | NormalizedErrorResponse

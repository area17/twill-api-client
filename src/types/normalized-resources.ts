import { ID, JsonApiResource } from '@/types'

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

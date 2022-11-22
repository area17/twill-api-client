import {
  ID,
  BlockResource,
  RelatedItemResource,
  MediaResource,
  FileResource
} from '../types'

export interface Resource extends Record<string, unknown> {
  id: ID
  type: string
  meta?: Record<string, unknown>
}

export interface Transformations {
  blocks?: Record<string, BlockResource[]>
  relatedItems?: Record<string, RelatedItemResource[]>
  media?: Record<string, MediaResource[]>
  files?: Record<string, FileResource[]>
}

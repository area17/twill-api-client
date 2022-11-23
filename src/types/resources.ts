import { ID, BlockResource, MediaResource, FileResource } from '@/types'

export interface Resource extends Record<string, unknown> {
  id: ID
  type: string
  meta?: Record<string, unknown>
}

export interface Fileable extends Resource {
  files: FileResource[] | undefined
}

export interface Transformations {
  blocks?: ExtractedResource<BlockResource>
  relatedItems?: ExtractedResource<Resource>
  media?: ExtractedResource<MediaResource>
  files?: ExtractedResource<FileResource>
}

export interface ExtractedResource<Type extends Resource> {
  [key: string]: Type[]
}

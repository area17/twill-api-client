import {
  ID,
  BlockResource,
  MediaResource,
  FileResource,
  RelatedItemResource,
} from '@/types'

export interface Resource extends Record<string, unknown> {
  id: ID
  type: string
  meta?: Record<string, unknown>
}

export interface Fileable extends Resource {
  files: FileResource[] | undefined
}

export interface Blockable extends Resource {
  blocks: BlockResource[] | undefined
}

export interface RelatedItemable extends Resource {
  relatedItems: RelatedItemResource[] | undefined
}

export interface Mediable extends Resource {
  media: MediaResource[] | undefined
}

export interface Transformations {
  blocks?: ExtractedResource<BlockResource>
  relatedItems?: ExtractedResource<Resource>
  media?: ExtractedResource<Array<Record<string, MediaResource>>>
  files?: ExtractedResource<FileResource>
}

export interface ExtractedResource<Type> {
  [key: string]: Type | Type[]
}

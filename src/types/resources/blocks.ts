import {
  JsonApiAttributes,
  JsonApiRelatedResource,
  JsonApiRelationship,
  JsonApiResource,
  FileRelated,
  FileResource,
  MediaRelated,
  MediaResource,
  RelatedItemRelated,
  RelatedItemResource,
  OrNull,
  Resource,
} from '../../types'

export interface JsonApiBlockResource extends JsonApiResource {
  type: 'blocks'
  attributes: BlockAttributes<BlockContent>
  relationships: {
    blocks: JsonApiRelationship<BlockRelated>
    files: JsonApiRelationship<FileRelated>
    media: JsonApiRelationship<MediaRelated>
    relatedItems: JsonApiRelationship<RelatedItemRelated>
  }
}

export interface BlockRelated extends JsonApiRelatedResource {
  type: 'blocks'
}

export interface BlockAttributes<Type extends BlockContent>
  extends JsonApiAttributes {
  blockType: string
  content: OrNull<Type>
  editorName: string
  childKey: OrNull<string>
  position: number
}

export interface BlockContent {
  [key: string]: unknown
}

export interface BlockRelationships {
  blocks: BlockResource[]
  files: FileResource[]
  media: MediaResource[]
  relatedItems: RelatedItemResource[]
}

export interface BlockResource
  extends Resource,
    BlockAttributes<BlockContent>,
    BlockRelationships {
  type: 'blocks'
}

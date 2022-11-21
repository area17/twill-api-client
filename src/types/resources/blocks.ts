import {
  JsonApiAttributes,
  JsonApiRelatedResource,
  JsonApiRelationship,
  JsonApiResource
} from '../json-api'
import { FileRelated } from './files'
import { MediaRelated } from './media'
import { RelatedItemRelated } from './related-items'
import { OrNull } from '../utils'

export interface BlockResource extends JsonApiResource {
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
  type: 'blocks'
  blockType: string
  content: OrNull<Type>
  editorName: string
  childKey: OrNull<string>
  position: number
}

export interface BlockContent {
  [key: string]: unknown
}

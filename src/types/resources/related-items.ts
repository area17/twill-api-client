import {
  JsonApiAttributes,
  JsonApiRelatedResource,
  JsonApiRelationship,
  JsonApiResource,
  Resource,
} from '@/types'

export interface JsonApiRelatedItemResource extends JsonApiResource {
  type: 'related-items'
  attributes: RelatedItemAttributes
  relationships: {
    related: JsonApiRelationship<JsonApiRelatedResource>
  }
}

export interface RelatedItemRelated extends JsonApiRelatedResource {
  type: 'related-items'
}

export interface RelatedItemAttributes extends JsonApiAttributes {
  browserName: string
  position: number
}

export interface RelatedItemResource extends Resource, RelatedItemAttributes {
  type: 'related-items'
  related: Resource
}

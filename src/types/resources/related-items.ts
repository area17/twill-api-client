import {
  JsonApiAttributes,
  JsonApiRelatedResource,
  JsonApiRelationship,
  JsonApiResource
} from '../json-api'

export interface RelatedItemResource extends JsonApiResource {
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

import { JsonApiAttributes, JsonApiRelatedResource } from '../json-api'
import { Resource } from '../resources'

export interface RelatedItemResource extends Resource, RelatedItemAttributes {
  type: 'related-items'
  related: Resource
}

export interface RelatedItemRelated extends JsonApiRelatedResource {
  type: 'related-items'
}

export interface RelatedItemAttributes extends JsonApiAttributes {
  browserName: string
  position: number
}

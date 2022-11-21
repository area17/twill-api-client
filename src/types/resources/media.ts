import {
  JsonApiAttributes,
  JsonApiMeta,
  JsonApiRelatedResource,
  JsonApiResource
} from '../json-api'

export interface MediaResource extends JsonApiResource {
  type: 'media'
  attributes: MediaAttributes
  meta: MediaMeta
}

export interface MediaRelated extends JsonApiRelatedResource {
  type: 'media'
  meta: MediaMeta
}

export interface MediaAttributes extends JsonApiAttributes {
  createdAt: string
  updatedAt: string
  uuid: string
  filename: string
  role: string
  crop: string
  ratio: number
  lqip: string
  src: string
  originalSrc: string
  width: number
  height: number
  alt: string
  caption: string
  video: string
  metadata: Object
}

export interface MediaMeta extends JsonApiMeta {
  role: string
  crop: string
  uuid: string
}

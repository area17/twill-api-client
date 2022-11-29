import {
  JsonApiAttributes,
  JsonApiMeta,
  JsonApiRelatedResource,
  JsonApiResource,
  Resource,
} from '@/types'

export interface JsonApiMediaResource extends JsonApiResource {
  type: 'media'
  attributes: MediaAttributes
  meta: MediaMeta
}

export interface MediaRelated extends JsonApiRelatedResource {
  type: 'media'
  meta?: MediaMeta
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
  metadata: Record<string, unknown>
}

export interface MediaMeta extends JsonApiMeta {
  role: string
  crop: string
  uuid: string
}

export interface MediaResource extends Resource, MediaAttributes {
  type: 'media'
  meta: MediaMeta
}

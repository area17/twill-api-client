import {
  JsonApiAttributes,
  JsonApiMeta,
  JsonApiRelatedResource,
  JsonApiResource
} from '../json-api'

export interface FileResource extends JsonApiResource {
  type: 'files'
  attributes: FileAttributes
  meta: FileMeta
}

export interface FileRelated extends JsonApiRelatedResource {
  type: 'files'
  meta: FileMeta
}

export interface FileAttributes extends JsonApiAttributes {
  createdAt: string
  updatedAt: string
  uuid: string
  filename: string
  role: string
  size: string
  originalSrc: string
}

export interface FileMeta extends JsonApiMeta {
  role: string
  uuid: string
}

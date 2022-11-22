import {
  JsonApiAttributes,
  JsonApiMeta,
  JsonApiRelatedResource,
  JsonApiResource,
  Resource,
} from '@/types'

export interface JsonApiFileResource extends JsonApiResource {
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

export interface FileResource extends Resource, FileAttributes {
  type: 'files'
  meta: FileMeta
}

export interface JsonApi {
  jsonapi: {
    version: string
    meta?: Record<string, unknown>
  }
}

export interface JsonApiDataResponse extends JsonApi {
  links: JsonApiLinks
  data: JsonApiResource | JsonApiResource[]
  included?: JsonApiResource[]
  meta?: {
    page?: JsonApiPagination
    [key: string]: unknown
  }
}

export interface JsonApiErrorResponse extends JsonApi {
  errors: Error[]
}

export type JsonApiResponse = JsonApiDataResponse | JsonApiErrorResponse

export interface JsonApiError {
  detail: string
  source: unknown
  status: string
  title: string
}

export interface JsonApiLinks {
  self: string
  [key: string]: string
}

export interface JsonApiResource {
  type: string
  id: ID
  attributes: JsonApiAttributes
  relationships: {
    [key: string]: JsonApiRelationship<JsonApiRelatedResource>
  }
  links?: JsonApiLinks
  meta?: JsonApiMeta
}

export type ID = string | number

export interface JsonApiAttributes {
  [key: string]: unknown
}

export interface JsonApiRelationship<Type extends JsonApiRelatedResource> {
  data: Type | Type[]
  meta?: Record<string, unknown>
  links?: JsonApiLinks
}

export interface JsonApiRelatedResource {
  type: string
  id: ID
  meta?: JsonApiMeta
}

export type JsonApiMeta = Record<string, unknown>

export interface JsonApiPagination {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
}

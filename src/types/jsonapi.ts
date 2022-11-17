export interface JsonResponse {
  jsonapi: {
    version: string
    meta?: Record<string, any>
  }
}

export interface DataResponse extends JsonResponse {
  links: Links
  data: Resource | Resource[]
  included?: Resource[]
  meta?: {
    page?: Pagination
    [key: string]: any
  }
}

export interface ErrorResponse extends JsonResponse {
  errors: Error[]
}

export type Response = DataResponse | ErrorResponse

export interface Error {
  detail: string
  source: any
  status: string
  title: string
}

export interface Links {
  self: string
  [key: string]: string
}

export interface Resource {
  type: string
  id: ID
  attributes: Attributes
  relationships: {
    [key: string]: Relationship
  }
  links?: Links
  meta?: Record<string, any>
}

export type ID = string | number

export interface Attributes {
  [key: string]: any
}

export interface Relationship {
  data: RelatedResource | RelatedResource[]
  meta?: Record<string, any>
  links?: Links
}

export interface RelatedResource {
  type: string
  id: ID
  meta?: Record<string, any>
}

export interface Pagination {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
}

interface JsonResponse {
  jsonapi: {
    version: string
    meta: Record<string, any>
  }
}

interface DataResponse extends JsonResponse {
  links: Links
  data: Resource | Resource[]
  included?: Resource[]
  meta?: {
    page?: Pagination
    [key: string]: any
  }
}

interface ErrorResponse extends JsonResponse {
  errors: Error[]
}

type Response = DataResponse | ErrorResponse

interface Error {
  detail: string
  source: any
  status: string
  title: string
}

interface Links {
  self: string
  [key: string]: string
}

interface Resource {
  type: string
  id: string
  attributes: Attributes
  relationships: {
    [key: string]: Relationship
  }
  links?: Links
  meta?: Record<string, any>
}

interface Attributes {
  [key: string]: any
}

interface Relationship {
  data: RelatedResource | RelatedResource[]
  meta: Record<string, any>
  links: Links
}

interface RelatedResource {
  type: string
  id: string
  meta?: Record<string, any>
}

interface Pagination {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
}

export type {
  Response,
  DataResponse,
  ErrorResponse,
  Resource,
  Pagination,
  Attributes,
  Relationship,
  RelatedResource
}

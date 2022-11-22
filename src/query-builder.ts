import { client } from './client'
import { JsonApiResponse } from './types'

interface QueryBuilderParams {
  filter?: Record<string, unknown>
  page?: Record<string, unknown>
  include?: string[] | string
  fields?: Record<string, unknown>
  sort?: string
  [key: string]: unknown
}

interface QueryBuilderOptions {
  path: string
  baseURL?: string
  headers?: Headers
}

type QueryBuilderResponse = Promise<JsonApiResponse | null>

type Headers = Record<string, string>

class QueryBuilder {
  readonly path: string
  readonly baseURL?: string
  readonly headers?: Headers
  params: QueryBuilderParams

  constructor(options: QueryBuilderOptions) {
    this.path = options.path
    this.baseURL = options.baseURL || ''
    this.headers = options.headers || ({} as Headers)
    this.params = {} as QueryBuilderParams
  }

  filter(filter: Record<string, unknown>): QueryBuilder {
    this.params.filter = { ...this.params.filter, ...filter }

    return this
  }

  page(page: Record<string, unknown>): QueryBuilder {
    this.params.page = { ...this.params.page, ...page }

    return this
  }

  include(includes: string[] | string): QueryBuilder {
    this.params.include = Array.isArray(includes)
      ? includes.join(',')
      : includes

    return this
  }

  fields(resourceName: string, fields = []): QueryBuilder {
    this.params.fields = this.params.fields || {}
    this.params.fields[resourceName] = fields.join(',')

    return this
  }

  sort(sort: string): QueryBuilder {
    this.params.sort = sort

    return this
  }

  query(query: string, value: any): QueryBuilder {
    this.params[query] = value

    return this
  }

  async fetch(): QueryBuilderResponse {
    const api = client()

    const options = {
      params: this.params,
      baseURL: this.baseURL,
      headers: this.headers,
    }

    let response: JsonApiResponse | null

    try {
      response = (await api(this.path, options)) as JsonApiResponse
    } catch (errors) {
      if (Array.isArray(errors))
        errors.map((error) =>
          console.error(
            'QueryBuilderError:',
            `${error.title} - ${error.detail} - ${this.path}`,
          ),
        )
      else {
        console.error('QueryBuilderError:', `${errors}`, `${this.path}`)
      }

      response = null
    }

    return response
  }
}

export { QueryBuilder }

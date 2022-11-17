import { client } from './client'
import { type Response } from './types/jsonapi'

interface QueryBuilder {
  path: string
  baseURL?: string
  headers?: Record<string, string>
  params: QueryBuilderParams
}

interface QueryBuilderParams {
  filter?: Object
  page?: Object
  include?: string[] | string
  fields?: Record<string, any>
  sort?: string
  [key: string]: any
}

interface QueryBuilderOptions {
  path: string
  baseURL?: string
  headers?: Record<string, string>
}

type QueryBuilderResponse = Promise<Response | null>

class QueryBuilder implements QueryBuilder {
  constructor(options: QueryBuilderOptions) {
    this.path = options.path
    this.baseURL = options.baseURL || ''
    this.headers = options.headers || <Record<string, string>>{}
    this.params = {}
  }

  filter(filter: Object): QueryBuilder {
    this.params.filter = { ...this.params.filter, ...filter }

    return this
  }

  page(page: Object): QueryBuilder {
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
      headers: this.headers
    }

    let response: Response | null

    try {
      response = (await api(this.path, options)) as Response
    } catch (errors) {
      if (Array.isArray(errors))
        errors.map((error) =>
          console.error(
            'QueryBuilderError:',
            `${error.title} - ${error.detail} - ${this.path}`
          )
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

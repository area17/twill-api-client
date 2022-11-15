import { client } from './client.js';

class QueryBuilder {
  constructor(options) {
    this.path = options.path;
    this.baseURL = options.baseURL || '';
    this.headers = options.headers || {};
    this.params = {};
  }

  filter(filter) {
    this.params.filter = { ...this.params.filter, ...filter };

    return this;
  }

  page(page) {
    this.params.page = { ...this.params.page, ...page };

    return this;
  }

  include(includes) {
    this.params.include = Array.isArray(includes)
      ? includes.join(',')
      : includes;

    return this;
  }

  fields(resourceName, fields = []) {
    this.params.fields = this.params.fields || {};
    this.params.fields[resourceName] = fields.join(',');

    return this;
  }

  sort(sort) {
    this.params.sort = sort;

    return this;
  }

  query(query, value) {
    this.params[query] = value;

    return this;
  }

  async fetch() {
    const api = client();

    const options = {
      params: this.params,
      baseURL: this.baseURL,
      headers: this.headers
    };

    let response;

    try {
      response = await api(this.path, options);
    } catch (errors) {
      if (Array.isArray(errors))
        errors.map((error) =>
          console.error(
            'QueryBuilderError:',
            `${error.title} - ${error.detail} - ${this.path}`
          )
        );
      else {
        console.error('QueryBuilderError:', `${errors}`, `${this.path}`);
      }

      response = null;
    }

    return response;
  }
}

export { QueryBuilder };

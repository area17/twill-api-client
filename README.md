# JavaScript library for Twill's JSON:API

This package can be used to fetch, normalize and deserialize resources from [Twill](https://github.com/area17/twill).

The package assumes the Twill app uses [`twill-api`](https://github.com/area17/twill-api) to expose content through a JSON:API.

The idea is to take advantage from the conventions of the [JSON:API specification](https://jsonapi.org/), but benefit from a "flatter" structure easier to work with in JavaScript applications.

## Installation

```bash
npm install @area17/twill
```

## Getting started

### JavaScript

```js
// client.js
import { Twill } from '@area17/twill'

const config = {
  url: config.TWILL_API_BASE,
  token: process.env.TWILL_API_AUTH_TOKEN,
  prefix: '/api',
  version: 'v1',
  cookie: {}
}

const client = new Twill(config)

export { client }
```

### Nuxt 3

In Nuxt 3, you can create a plugin that provides the Twill client to the app context.

```js
// plugins/twill.js
import { Twill } from '@area17/twill'

export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config

  const api = {
    url: config.TWILL_API_BASE,
    token: config.TWILL_API_AUTH_TOKEN,
    prefix: '/api',
    version: 'v1',
    cookie: {}
  }

  const twill = Twill(api)

  return {
    provide: {
      twill
    }
  }
})
```

It will then be available in the app context.

```js
const { $twill } = useNuxtApp()

try {
  response = await $twill
    .find('pages')
    .filter({
      slug: 'about'
    })
    .include(['blocks.media', 'blocks.related-items.related', 'media'])
    .fetch()
} catch (error) {
  throw error
}

const resource = $twill.transform(response).pop()
```

## Methods

#### `get`, `find`, `findOne`, `findRelated`, `findRelationship`

These methods return a [query builder](#query-builder).

#### `transform`

Transform will normalize, deserialize and extract the most common Twill patterns:

- blocks by editor name
- media crops by role
- files by role
- related items by browser name

#### `normalize`, `deserialize`, `extract`

These three methods used by `transform` are also accesible.

## Query builder

The query builder is useful to construct a query to be sent to the JSON:API.

- `filter`
- `page`
- `include`
- `fields`
- `sort`
- `query`
- `fetch`

### Example

Let's say we want to request the 10 most recent pages that are published. Of those, we want only the title, slug, description and the relationship `media`. Using the query builder, it would look like this:

```js
import { client } from './client.js'

const currentPage = 1

const response = client
  .find('pages')
  .filter({ published: true })
  .page({ size: 10, number: currentPage })
  .fields(['title', 'slug', 'description'])
  .include('media')
  .sort('-createdAt')
  .fetch()
```

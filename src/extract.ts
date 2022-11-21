import { Resource } from './types'
import { blocks } from './extract/blocks'
import { browsers } from './extract/related-items'
// @ts-ignore
import { images } from './extract/images'

export const extract = (resource: Resource) => {
  return {
    editors: blocks(resource),
    images: images(resource),
    browsers: browsers(resource)
  }
}

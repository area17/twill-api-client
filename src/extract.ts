import { Resource, Transformations } from '@/types'
import { blocks } from '@/extract/blocks'
import { browsers } from '@/extract/related-items'
import { files } from '@/extract/files'
// @ts-ignore
import { images } from '@/extract/images'

export const extract = (resource: Resource) => {
  const extracted: Transformations = {}

  if (Array.isArray(resource.blocks)) {
    extracted.blocks = blocks(resource)
  }

  if (Array.isArray(resource.media)) {
    extracted.media = images(resource)
  }

  if (Array.isArray(resource.relatedItems)) {
    extracted.relatedItems = browsers(resource)
  }

  if (Array.isArray(resource.files)) {
    extracted.files = files(resource)
  }

  return extracted
}

import {
  RelatedItemResource,
  Resource,
  OrNull,
  ExtractedResource,
  RelatedItemable,
} from '@/types'
import { unique } from '@/utils/unique'

export function browser(
  resource: RelatedItemable,
  browserName: string,
): Resource[] {
  const browsers: OrNull<Record<string, number[]>> =
    (resource.meta?.browsers as any) || null
  const data: RelatedItemResource[] =
    resource.relatedItems as RelatedItemResource[]

  return data
    .filter((resource) => resource.browserName === browserName)
    .sort((a, b) => a.position - b.position)
    .map((resource) => resource.related)
    .filter((resource) => {
      if (!resource) {
        return null
      }

      if (resource.type !== 'blocks') {
        return true
      }

      return (
        browsers !== null &&
        browsers[browserName] &&
        browsers[browserName].includes(parseInt(resource.id as string))
      )
    })
}

export function relatedItems(
  resource: Resource | RelatedItemable,
): ExtractedResource<Resource> {
  if (!resource.relatedItems) {
    return {}
  }

  const browsers: ExtractedResource<Resource> = {}

  if (Array.isArray(resource?.relatedItems)) {
    const browserNames: string[] = unique(
      resource.relatedItems,
      'browserName',
    ) as string[]

    browserNames.map((browserName) => {
      browsers[browserName] = browser(resource as RelatedItemable, browserName)
    })
  }

  return browsers
}

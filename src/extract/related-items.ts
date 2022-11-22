import { RelatedItemResource, RelatedItems, Resource, OrNull } from '../types'

export function browser<Type extends Resource>(
  resource: Type,
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

export function browsers<Type extends Resource>(resource: Type): RelatedItems {
  const browsers: RelatedItems = {}

  if (Array.isArray(resource?.relatedItems)) {
    const browserNames: string[] = resource?.relatedItems.map(
      (relatedItem: Resource) => relatedItem.browserName as string,
    )
    const uniqueBrowserNames = [...new Set(browserNames)]

    uniqueBrowserNames.map((browserName) => {
      browsers[browserName] = browser(resource, browserName)
    })
  }

  return browsers
}

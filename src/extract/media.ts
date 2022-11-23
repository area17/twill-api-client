import { ExtractedResource, Mediable, MediaResource, Resource } from '@/types'
import { unique } from '@/utils/unique'

export function media(
  resource: Resource | Mediable,
): ExtractedResource<Array<Record<string, MediaResource>>> {
  if (!resource.media) {
    return {}
  }

  const roles: string[] = Array.isArray(resource.media)
    ? (unique(resource.media, 'meta.role') as string[])
    : []

  const images: ExtractedResource<Array<Record<string, MediaResource>>> = {}

  roles.map((role) => {
    images[role as string] = mediaByRole(resource as Mediable, role)
  })

  return images
}

export function mediaByRole(
  resource: Mediable,
  role: string,
): Array<Record<string, MediaResource>> {
  if (!resource.media) {
    return []
  }

  const imagesByUUID: Record<string, Record<string, MediaResource>> = {}

  resource.media
    .filter((media) => {
      return media.meta.role === role
    })
    .map((media) => {
      if (!imagesByUUID[media.meta.uuid]) {
        imagesByUUID[media.meta.uuid] = {}
      }

      imagesByUUID[media.meta.uuid][media.meta.crop] = media
    })

  return Object.values(imagesByUUID)
}

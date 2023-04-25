import { camelCaseKeys } from '@/utils/camel-case-keys'
import { DResource, DResourceRelationship } from './blocks'

interface MediaDResource extends DResource {
  type: 'media'
  attributes: {
    createdAt: string
    updatedAt: string
    uuid: string
    filename: string
    role: string
    crop: string
    ratio: number
    lqip: string
    src: string
    originalSrc: string
    width: number
    height: number
    alt: string
    caption: string
    video: string
    metadata: Record<string, unknown>
  }
  meta: {
    role: string
    crop: string
    uuid: string
  }
}

interface MediaDRelationship extends DResourceRelationship<MediaDResource[]> {
  meta: {
    roles: Record<string, Record<string, string>[]>
  }
}

export function media(
  resource: DResource,
): Record<string, Record<string, MediaDResource>[]> {
  if (!resource.relationships?.media) {
    return {}
  }

  const relationship = resource.relationships.media as MediaDRelationship
  const images: Record<string, Record<string, MediaDResource>[]> = {}

  for (const [key, value] of Object.entries(relationship.meta.roles)) {
    images[key] = value.map<Record<string, MediaDResource>>((image) => {
      const crops: Record<string, MediaDResource> = {}

      for (const [key, value] of Object.entries(image)) {
        if (typeof relationship.data === 'undefined' || !relationship.data) {
          break
        }
        crops[key] = relationship.data.find(
          (media: MediaDResource) => media.id === value,
        ) as MediaDResource
      }

      return crops
    })
  }

  return camelCaseKeys(images) as Record<
    string,
    Record<string, MediaDResource>[]
  >
}

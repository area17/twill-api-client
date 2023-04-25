import { camelCaseKeys } from '@/utils/camel-case-keys'
import { DResource, DResourceRelationship } from './blocks'

interface FileDResource extends DResource {
  type: 'files'
  attributes: {
    createdAt: string
    updatedAt: string
    uuid: string
    filename: string
    role: string
    size: string
    originalSrc: string
  }
  meta: {
    role: string
    uuid: string
  }
}

interface FileDRelationship extends DResourceRelationship<FileDResource[]> {
  meta: {
    roles: Record<string, string[]>
  }
}

export function files(
  resource: DResource,
  role: string | null = null,
): Record<string, FileDResource[]> {
  if (!resource.relationships?.files) {
    return {}
  }

  const relationship = resource.relationships.files as FileDRelationship
  const files: Record<string, FileDResource[]> = {}
  let roles = relationship.meta.roles

  if (role) {
    roles = { [role]: relationship.meta.roles[role] }
  }

  for (const [key, value] of Object.entries(roles)) {
    files[key] = value
      .map<FileDResource | null>((id) => {
        if (typeof relationship.data === 'undefined' || !relationship.data) {
          return null
        }
        return relationship.data.find(
          (file: FileDResource) => file.id === id,
        ) as FileDResource
      })
      .filter((n) => n) as FileDResource[]
  }

  return camelCaseKeys(files) as Record<string, FileDResource[]>
}

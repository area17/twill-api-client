import { ExtractedResource, Fileable, FileResource, Resource } from '@/types'
import { camelCaseKeys } from '@/utils/camel-case-keys'
import { unique } from '@/utils/unique'

export function filesByRole<Type extends Fileable>(
  resource: Type,
  role: string,
): FileResource[] {
  const filesByUUID: Record<string, FileResource> = {}

  if (Array.isArray(resource.files)) {
    resource.files
      .filter((fileable) => {
        return fileable.meta.role === role
      })
      .map((fileable: FileResource) => {
        filesByUUID[fileable.meta.uuid as string] = fileable
      })
  }

  return Object.values(filesByUUID)
}

export function files(
  resource: Resource | Fileable,
): ExtractedResource<FileResource> {
  if (!resource.files) {
    return {}
  }

  const roles: string[] = Array.isArray(resource.files)
    ? (unique(resource.files, 'meta.role') as string[])
    : []

  const files: ExtractedResource<FileResource> = {}

  roles.map((role) => {
    files[role] = filesByRole(resource as Fileable, role)
  })

  return camelCaseKeys(files) as ExtractedResource<FileResource>
}

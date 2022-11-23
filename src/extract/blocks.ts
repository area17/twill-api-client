import { BlockResource } from '@/types'
import { Blockable, ExtractedResource, Resource } from '@/types/resources'
import { unique } from '@/utils/unique'

export function editor(
  resource: Blockable,
  editorName = 'default',
): BlockResource[] {
  if (Array.isArray(resource.blocks)) {
    return resource.blocks
      .filter((block) => block.editorName === editorName)
      .sort((a, b) => a.position - b.position)
  }

  return []
}

export function blocks(
  resource: Resource | Blockable,
): ExtractedResource<BlockResource> {
  if (!resource.blocks) {
    return {}
  }

  const editors = {} as ExtractedResource<BlockResource>

  if (Array.isArray(resource.blocks)) {
    const editorNames = unique(resource.blocks, 'editorName') as string[]

    editorNames.map((editorName) => {
      editors[editorName] = editor(resource as Blockable, editorName)
    })
  }

  return editors
}

import { BlockResource } from '@/types'
import { ExtractedResource, Resource } from '@/types/resources'

function editor<Type extends Resource>(
  resource: Type,
  editorName = 'default',
): BlockResource[] {
  if (resource.blocks && Array.isArray(resource.blocks)) {
    return resource.blocks
      .filter((block) => block.editorName === editorName)
      .sort((a, b) => a.position - b.position)
  }
  return []
}

function blocks<Type extends Resource>(
  resource: Type,
): ExtractedResource<BlockResource> {
  const editors = {} as ExtractedResource<BlockResource>

  if (Array.isArray(resource.blocks)) {
    const editorNames = resource?.blocks?.map((block) => block.editorName)
    const uniqueEditorNames = [...new Set(editorNames)]

    uniqueEditorNames.map((editorName) => {
      editors[editorName] = editor(resource, editorName)
    })
  }

  return editors
}

export { blocks, editor }

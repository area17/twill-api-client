import { DeserializedResource } from '../types/resources'
import { Editors } from '../types/transforms'

function editor<Type extends DeserializedResource>(
  resource: Type,
  editorName = 'default'
): DeserializedResource[] {
  if (resource.blocks && Array.isArray(resource.blocks)) {
    return resource.blocks
      .filter((block) => block.editorName === editorName)
      .sort((a, b) => a.position - b.position)
  }
  return []
}

function blocks<Type extends DeserializedResource>(resource: Type): Editors {
  const editors = {} as Editors

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
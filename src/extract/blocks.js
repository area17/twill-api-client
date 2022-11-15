function editor(resource, editorName = 'default') {
  const blocks = resource.blocks || resource
  return blocks
    .filter((block) => block.editorName === editorName)
    .sort((a, b) => a.position - b.position)
}

function blocks(resource) {
  const editorNames = resource?.blocks?.map((block) => block.editorName)
  const uniqueEditorNames = [...new Set(editorNames)]
  const editors = {}

  uniqueEditorNames.map((editorName) => {
    editors[editorName] = editor(resource, editorName)
  })

  return editors
}

export { blocks, editor }

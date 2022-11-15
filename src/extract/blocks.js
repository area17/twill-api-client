function blocks(resource, editorName = 'default') {
  const blocks = resource.blocks || resource
  return blocks
    .filter((block) => block.editorName === editorName)
    .sort((a, b) => a.position - b.position)
}

function allBlocks(resource) {
  const blocks = resource?.blocks?.map((block) => block.editorName)

  const uniqueEditors = [...new Set(blocks)]

  const editors = {}

  uniqueEditors.map((editorName) => {
    editors[editorName] = blocks(resource, editorName)
  })

  return editors
}

export { blocks, allBlocks }

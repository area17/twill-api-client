export interface DResource {
  id: string;
  type: string;
  attributes?: Record<string, any>;
  relationships?: Record<string, DResourceRelationship<DResource>>;
  meta?: Record<string, any>
  links?: Record<string, any>;
}

export interface DResourceRelationship<T> {
  data: undefined | T
  meta?: Record<string, any>
  links?: Record<string, any>;
}

interface BlockDRelationship extends DResourceRelationship<BlockDResource[]> {
  meta: {
    editors: Record<string, string[]>;
  };
}

interface BlockDResource extends DResource {
  type: 'blocks';
  attributes: {
    blockType: string;
    position: number;
    content: Record<string, any>;
  }
  relationships: {
    blocks: DResourceRelationship<BlockDResource>;
  };
}

function e(editorName: string, relationship: BlockDRelationship): BlockDResource[] | null {
  if (typeof relationship.data === 'undefined') {
    return null
  }

  if (!Array.isArray(relationship.data) || !Array.isArray(relationship.meta.editors[editorName])) {
    return null
  }

  const ids = relationship.meta.editors[editorName];

  const blocks: BlockDResource[] = ids.map(
    (id: string) => {
      if (typeof relationship.data !== 'undefined') {
        return relationship.data.find((block: BlockDResource) => block.id === id)
      }
      return undefined
    }
  ).filter(n => n) as BlockDResource[]

  return blocks.sort((a: BlockDResource, b: BlockDResource) => a.attributes.position - b.attributes.position)
}

export function blocks(
  resource: DResource,
  editorName: string | null = null
): Record<string, BlockDResource[] | null> {
  if (!resource.relationships?.blocks) {
    return {}
  }

  const relationship = resource.relationships.blocks as BlockDRelationship
  const editors: Record<string, BlockDResource[] | null> = {}

  if (editorName) {
    editors[editorName] = e(editorName, relationship)
  } else {
    Object.keys(relationship.meta.editors).forEach((editorName) => {
      editors[editorName] = e(editorName, relationship)
    })
  }

  return editors
}

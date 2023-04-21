import {camelCaseKeys} from '@/utils/camel-case-keys'
import {DResource, DResourceRelationship} from './blocks'

interface RelatedItemDResource extends DResource {
  type: 'related-items';
  attributes: {
    browserName: string
    position: number
  };
  relationships: {
    related:  DResourceRelationship<DResource>
  };
}

interface RelatedItemDRelationship extends DResourceRelationship<RelatedItemDResource[]> {
  meta: {
    browsers: Record<string, string[]>;
  }
}

export function browsers(
  resource: DResource,
  name: string | null = null
): Record<string, DResource[]> {
  if (!resource.relationships?.relatedItems) {
    return {}
  }

  const relationship = resource.relationships.relatedItems as RelatedItemDRelationship
  const related: Record<string, RelatedItemDResource[]> = {}
  let browsers = relationship.meta.browsers

  if (name) {
    browsers = { [name]: relationship.meta.browsers[name] }
  }

  for (const [key, value] of Object.entries(browsers)) {
    related[key] = value.map<RelatedItemDResource | null>((id) => {
      if (typeof relationship.data === 'undefined' || !relationship.data) {
        return null
      }
      return relationship.data.find((item: RelatedItemDResource) => item.id === id) as RelatedItemDResource
    }).filter(n => n) as RelatedItemDResource[]
  }

  const items: Record<string, DResource[]> =   Object.keys(related).reduce((acc: Record<string, DResource[]>, name) => {
      acc[name] = related[name]
        .map((item) => item.relationships.related.data)
        .filter(n => n) as DResource[]
      return acc;
  }, {} as Record<string, DResource[]>)

  return camelCaseKeys(items) as Record<string, DResource[]>
}

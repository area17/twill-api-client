import { Resource } from './resources'
import { OrNull } from './utils'

export interface HasTransforms {
  blocks: OrNull<Editors>
  media: OrNull<Images>
  files: OrNull<Files>
  browsers: OrNull<RelatedItems>
}

export interface Editors {
  [key: string]: Resource[]
}

export interface Images {
  [key: string]: Resource[]
}

export interface Files {
  [key: string]: Resource[]
}

export interface RelatedItems {
  [key: string]: Resource[]
}

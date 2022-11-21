// TODO make conditional to Has* interface
// eg if HasBlocks, then blocks is Editors

import { DeserializedResource } from './resources'
import { OrNull } from './utils'

export interface HasTransforms {
  blocks: OrNull<Editors>
  media: OrNull<Images>
  files: OrNull<Files>
  relatedITems: OrNull<RelatedItems>
}

// type TEditors<Type> = Type extends HasBlocks
//   ? {
//       blocks: OrNull<Editors>
//     }
//   : Type

export interface Editors {
  [key: string]: DeserializedResource[]
}

export interface Images {
  [key: string]: DeserializedResource[]
}

export interface Files {
  [key: string]: DeserializedResource[]
}

export interface RelatedItems {
  [key: string]: DeserializedResource[]
}

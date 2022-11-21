import { ID } from '../types'

export interface Resource extends Record<string, unknown> {
  id: ID
  type: string
  meta?: Record<string, any>
}

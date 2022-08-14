import type { StudyLogModel } from './models'

export type StudyLogModelMapper = StudyLogModel & {
  userId?: string
  id: string
}

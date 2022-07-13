import { z } from 'zod'
import { timestamp } from '../../clients/firebase/timestamp'

export const UserModel = z.object({
  createdAt: timestamp,
  id: z.string(),
  name: z.string(),
  updatedAt: timestamp,
})

export type User = z.infer<typeof UserModel>

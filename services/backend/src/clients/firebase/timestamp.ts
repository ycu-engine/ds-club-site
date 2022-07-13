import { z } from 'zod'
import { Timestamp, FieldValue } from 'firebase-admin/firestore'

export const timestamp = z
  .instanceof(Timestamp)
  .or(z.custom<FieldValue>((value) => value instanceof FieldValue))
  .transform((v) => (v instanceof FieldValue ? new Date(0) : v.toDate()))

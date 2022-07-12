import type { QueryResolvers } from '../generates/graphql'
import { firestore } from '../modules/firebase'

export const ok: QueryResolvers['ok'] = async () => {
  await firestore.collection('test').doc('test').set({
    test: 'test',
  })
  return true
}

import { firestore } from '../../clients/firebase'
import { newsModelConverter } from './models'
import type { News } from '../../generates/graphql'

const newsCollection = firestore
  .collection('news')
  .withConverter(newsModelConverter)

export const listNews = async (): Promise<News[]> => {
  const snapshot = await newsCollection.get()
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

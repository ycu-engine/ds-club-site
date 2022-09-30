import { firestore } from '../../clients/firebase'
import { newsModelConverter } from './models'
import type { News } from '../../generates/graphql'
import { FieldValue } from 'firebase-admin/firestore'

const newsCollection = firestore
  .collection('news')
  .withConverter(newsModelConverter)

export const listNews = async (): Promise<News[]> => {
  const snapshot = await newsCollection.get()
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export const getNews = async (id: string): Promise<News | null> => {
  const snapshot = await newsCollection.doc(id).get()
  const news = snapshot.data()
  if (!news) {
    return null
  }
  return { ...news, id: snapshot.id }
}

export const createNews = async (obj: {
  title: string
  body: string
}): Promise<News> => {
  const ref = await newsCollection.add({
    ...obj,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const news = await getNews(ref.id)
  if (!news) {
    throw new Error('News not created')
  }
  return news
}

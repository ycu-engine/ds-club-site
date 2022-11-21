import { firestore } from '../../clients/firebase'
import { newsModelConverter } from './models'
import { FieldValue } from 'firebase-admin/firestore'
import type { NewsModelMapper } from './types'

const newsCollection = firestore
  .collection('news')
  .withConverter(newsModelConverter)

export const listNews = async (): Promise<NewsModelMapper[]> => {
  const snapshot = await newsCollection.get()
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export const getNews = async (id: string): Promise<NewsModelMapper | null> => {
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
}): Promise<NewsModelMapper> => {
  const ref = await newsCollection.add({
    ...obj,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const news = await getNews(ref.id)
  if (!news) {
    throw new Error('NewsModelMapper not created')
  }
  return news
}

export const updateNews = async (
  id: string,
  obj: {
    title: string
    body: string
  },
): Promise<NewsModelMapper> => {
  const ref = newsCollection.doc(id)
  await ref.update({
    ...obj,
    updatedAt: FieldValue.serverTimestamp(),
  })
  const news = await getNews(id)
  if (!news) {
    throw new Error('NewsModelMapper not updated')
  }
  return news
}

export const deleteNews = async (id: string): Promise<NewsModelMapper> => {
  const ref = newsCollection.doc(id)
  const news = await getNews(id)
  if (!news) {
    throw new Error('対象のお知らせが存在しません')
  }
  await ref.delete()
  return news
}

import { firestore } from '../../clients/firebase'
import { FieldValue } from 'firebase-admin/firestore'
import { TrialApplicationModelConverter } from './models'
import type { SubmitTrialApplicationInput } from '../../generates/graphql'

const TrialApplicationCollection = firestore
  .collection('trialApplications')
  .withConverter(TrialApplicationModelConverter)

export const createTrialApplication = async (
  obj: SubmitTrialApplicationInput,
): Promise<void> => {
  await TrialApplicationCollection.add({
    ...obj,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
}

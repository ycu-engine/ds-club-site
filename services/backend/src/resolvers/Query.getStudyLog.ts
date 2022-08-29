import type { QueryResolvers } from '../generates/graphql'

export const getStudyLogResolver: NonNullable<
  QueryResolvers['getStudyLog']
> = async (_root, { userId: _userId }, { user: _user }) => {
  await Promise.resolve()
  return [
    {
      createdAt: new Date('2022-04-26'),
      id: '1',
      studiedAt: new Date('2022-04-26'),
      studyContent: 'Pythonの勉強',
      studyTime: 20,
      updatedAt: new Date('2022-04-26'),
      userId: '1',
    },
    {
      createdAt: new Date('2022-05-03'),
      id: '1',
      studiedAt: new Date('2022-05-03'),
      studyContent: 'Reactの勉強、Next.js',
      studyTime: 18,
      updatedAt: new Date('2022-04-26'),
      userId: '1',
    },
    {
      createdAt: new Date('2022-05-10'),
      id: '1',
      studiedAt: new Date('2022-05-10'),
      studyContent: '',
      studyTime: 60,
      updatedAt: new Date('2022-04-26'),
      userId: '1',
    },
    {
      createdAt: new Date('2022-05-17'),
      id: '1',
      studiedAt: new Date('2022-05-17'),
      studyContent: '',
      studyTime: 65,
      updatedAt: new Date('2022-04-26'),
      userId: '1',
    },
    {
      createdAt: new Date('2022-05-24'),
      id: '1',
      studiedAt: new Date('2022-05-24'),
      studyContent: '',
      studyTime: 15,
      updatedAt: new Date('2022-04-26'),
      userId: '1',
    },
    {
      createdAt: new Date('2022-04-26'),
      id: '1',
      studiedAt: new Date('2022-04-26'),
      studyContent: 'Pythonの勉強',
      studyTime: 20,
      updatedAt: new Date('2022-04-26'),
      userId: '1',
    },
    {
      createdAt: new Date('2022-05-03'),
      id: '1',
      studiedAt: new Date('2022-05-03'),
      studyContent: 'Reactの勉強、Next.js',
      studyTime: 18,
      updatedAt: new Date('2022-04-26'),
      userId: '1',
    },
    {
      createdAt: new Date('2022-05-10'),
      id: '1',
      studiedAt: new Date('2022-05-10'),
      studyContent: '',
      studyTime: 60,
      updatedAt: new Date('2022-04-26'),
      userId: '1',
    },
    {
      createdAt: new Date('2022-05-17'),
      id: '1',
      studiedAt: new Date('2022-05-17'),
      studyContent: '',
      studyTime: 65,
      updatedAt: new Date('2022-04-26'),
      userId: '1',
    },
    {
      createdAt: new Date('2022-05-24'),
      id: '1',
      studiedAt: new Date('2022-05-24'),
      studyContent: '',
      studyTime: 15,
      updatedAt: new Date('2022-04-26'),
      userId: '1',
    },
  ]

  // if (user?.id !== userId) {
  //   throw new Error('学習記録を見る権限がありません')
  // }
  // const log = await listStudyLogs(userId)
  // if (log) {
  //   throw new Error('User not found')
  // }
  // return log
}

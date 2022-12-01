import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { DateResolver, DateTimeResolver } from 'graphql-scalars'
import { join } from 'path'
import type { Resolvers } from './generates/graphql'
import { createStudyLogResolver } from './resolvers/Mutation.createStudyLog'
import { createUserResolver } from './resolvers/Mutation.createUser'
import { submitTrialApplicationResolver } from './resolvers/Mutation.submitTrialApplication'
import { updateUserPaymentStatusResolver } from './resolvers/Mutation.updateUserPaymentStatus'
import { updateUserRankResolver } from './resolvers/Mutation.updateUserRank'
import { getNewsListResolver } from './resolvers/Query.getNewsList'
import { getRegularUsersResolver } from './resolvers/Query.getRegularUsers'
import { getStudyLogResolver } from './resolvers/Query.getStudyLog'
import { getUserResolver } from './resolvers/Query.getUser'
import { okResolver } from './resolvers/Query.ok'
import { __resolveTypeResolve } from './resolvers/User.__resolveType'
import { addMenterResolver } from './resolvers/Mutation.addMenter'
import { removeMenterResolver } from './resolvers/Mutation.removeMenter'
import { getEventsResolver } from './resolvers/Query.getEvents'
import { createEventResolver } from './resolvers/Mutation.createEvent'
import { createWeeklyRepeatEventResolver } from './resolvers/Mutation.createWeeklyRepeatEvent'
import { deleteEventResolver } from './resolvers/Mutation.deleteEvent'
import { deleteEventsResolver } from './resolvers/Mutation.deleteEvents'
import { createNewsResolver } from './resolvers/Mutation.createNews'
import { createTrialUserResolver } from './resolvers/Mutation.createTrialUser'
import { getTrialUserResolver } from './resolvers/Query.getTrialUsers'
import { enrollTrialUserResolver } from './resolvers/Mutation.enrollTrialUser'
import { deleteTrialUserResolver } from './resolvers/Mutation.deleteTrialUser'
import { TrialUserExpiredAtResolver } from './resolvers/TrialUser.expiredAt'
import { getStudyLogsResolver } from './resolvers/Query.getStudyLogs'
import { enableTrialUserResolver } from './resolvers/Mutation.enableTrialUser'
import { TrialUserDisabledResolver } from './resolvers/TrialUser.disabled'
import { getUsersResolver } from './resolvers/Query.getUsers'
import { studyLogsResolver } from './resolvers/User.studyLogs'
import { menterResolver } from './resolvers/User.menter'
import { menteeResolver } from './resolvers/RegularUser.mentee'
import { updateNewsResolver } from './resolvers/Mutation.updateNews'
import { deleteNewsResolver } from './resolvers/Mutation.deleteNews'
import { createMenterGroupResolver } from './resolvers/Mutation.createMenterGroup'
import { deleteStudyLogResolver } from './resolvers/Mutation.deleteStudyLog'

export const resolvers: Resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  Mutation: {
    addMenter: addMenterResolver,
    createEvent: createEventResolver,
    createMenterGroup: createMenterGroupResolver,
    createNews: createNewsResolver,
    createStudyLog: createStudyLogResolver,
    createTrialUser: createTrialUserResolver,
    createUser: createUserResolver,
    createWeeklyRepeatEvent: createWeeklyRepeatEventResolver,
    deleteEvent: deleteEventResolver,
    deleteEvents: deleteEventsResolver,
    deleteNews: deleteNewsResolver,
    deleteStudyLog: deleteStudyLogResolver,
    deleteTrialUser: deleteTrialUserResolver,
    enableTrialUser: enableTrialUserResolver,
    enrollTrialUser: enrollTrialUserResolver,
    removeMenter: removeMenterResolver,
    submitTrialApplication: submitTrialApplicationResolver,
    updateNews: updateNewsResolver,
    updateUserPaymentStatus: updateUserPaymentStatusResolver,
    updateUserRank: updateUserRankResolver,
  },
  Query: {
    getEvents: getEventsResolver,
    getNewsList: getNewsListResolver,
    getRegularUsers: getRegularUsersResolver,
    getStudyLog: getStudyLogResolver,
    getStudyLogs: getStudyLogsResolver,
    getTrialUsers: getTrialUserResolver,
    getUser: getUserResolver,
    getUsers: getUsersResolver,
    ok: okResolver,
  },
  RegularUser: {
    mentee: menteeResolver,
    menter: menterResolver,
    studyLogs: studyLogsResolver,
  },
  TrialUser: {
    disabled: TrialUserDisabledResolver,
    expiredAt: TrialUserExpiredAtResolver,
    menter: menterResolver,
    studyLogs: studyLogsResolver,
  },
  User: {
    __resolveType: __resolveTypeResolve,
  },
}

export const createSchema = async () => {
  return await loadSchema(join(__dirname, '..', 'schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
    resolvers,
  })
}

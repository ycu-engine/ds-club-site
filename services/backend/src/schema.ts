import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { DateResolver, DateTimeResolver } from 'graphql-scalars'
import { join } from 'path'
import type { Resolvers } from './generates/graphql'
import { addMenterResolver } from './resolvers/Mutation.addMenter'
import { createEventResolver } from './resolvers/Mutation.createEvent'
import { createNewsResolver } from './resolvers/Mutation.createNews'
import { createStudyLogResolver } from './resolvers/Mutation.createStudyLog'
import { createTrialUserResolver } from './resolvers/Mutation.createTrialUser'
import { createUserResolver } from './resolvers/Mutation.createUser'
import { createWeeklyRepeatEventResolver } from './resolvers/Mutation.createWeeklyRepeatEvent'
import { deleteEventResolver } from './resolvers/Mutation.deleteEvent'
import { deleteEventsResolver } from './resolvers/Mutation.deleteEvents'
import { deleteTrialUserResolver } from './resolvers/Mutation.deleteTrialUser'
import { enrollTrialUserResolver } from './resolvers/Mutation.enrollTrialUser'
import { removeMenterResolver } from './resolvers/Mutation.removeMenter'
import { removeUserRoleResolver } from './resolvers/Mutation.removeUserRole'
import { submitTrialApplicationResolver } from './resolvers/Mutation.submitTrialApplication'
import { updateUserPaymentStatusResolver } from './resolvers/Mutation.updateUserPaymentStatus'
import { updateUserRankResolver } from './resolvers/Mutation.updateUserRank'
import { getEventsResolver } from './resolvers/Query.getEvents'
import { getNewsListResolver } from './resolvers/Query.getNewsList'
import { getRegularUsersResolver } from './resolvers/Query.getRegularUsers'
import { getStudyLogResolver } from './resolvers/Query.getStudyLog'
import { getStudyLogsResolver } from './resolvers/Query.getStudyLogs'
import { getTrialUserResolver } from './resolvers/Query.getTrialUsers'
import { getUserResolver } from './resolvers/Query.getUser'
import { okResolver } from './resolvers/Query.ok'
import { menteeResolver } from './resolvers/RegularUser.mentee'
import { regularUserStudyLogsResolver } from './resolvers/RegularUser.studyLogs'
import { TrialUserMenterResolver } from './resolvers/TrialUser.menter'
import { TrialUserStudyLogsResolver } from './resolvers/TrialUser.studyLogs'
import { __resolveTypeResolve } from './resolvers/User.__resolveType'

const resolvers: Resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  Mutation: {
    addMenter: addMenterResolver,
    createEvent: createEventResolver,
    createNews: createNewsResolver,
    createStudyLog: createStudyLogResolver,
    createTrialUser: createTrialUserResolver,
    createUser: createUserResolver,
    createWeeklyRepeatEvent: createWeeklyRepeatEventResolver,
    deleteEvent: deleteEventResolver,
    deleteEvents: deleteEventsResolver,
    deleteTrialUser: deleteTrialUserResolver,
    enrollTrialUser: enrollTrialUserResolver,
    removeMenter: removeMenterResolver,
    removeUserRole: removeUserRoleResolver,
    submitTrialApplication: submitTrialApplicationResolver,
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
    ok: okResolver,
  },
  RegularUser: {
    mentee: menteeResolver,
    menter: menterResolver,
    studyLogs: regularUserStudyLogsResolver,
  },
  TrialUser: {
    menter: TrialUserMenterResolver,
    studyLogs: TrialUserStudyLogsResolver,
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

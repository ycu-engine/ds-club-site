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
import { menterResolver } from './resolvers/RegularUser.menter'
import { getNewsResolver } from './resolvers/Query.getNews.resolvers'
import { getRegularUsersResolver } from './resolvers/Query.getRegularUsers'
import { getStudyLogResolver } from './resolvers/Query.getStudyLog'
import { getUserResolver } from './resolvers/Query.getUser'
import { okResolver } from './resolvers/Query.ok'
import { userResolver } from './resolvers/StudyLog.user'
import { __resolveTypeResolve } from './resolvers/User.__resolveType'
import { addMenterResolver } from './resolvers/Mutation.addMenter'
import { removeMenterResolver } from './resolvers/Mutation.removeMenter'
import { menteeResolver } from './resolvers/RegularUser.mentee'
import { getEventsResolver } from './resolvers/Query.getEvents'
import { createEventResolver } from './resolvers/Mutation.createEvent'
import { createWeeklyRepeatEventResolver } from './resolvers/Mutation.createWeeklyRepeatEvent'
const resolvers: Resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  Mutation: {
    addMenter: addMenterResolver,
    createEvent: createEventResolver,
    createStudyLog: createStudyLogResolver,
    createUser: createUserResolver,
    createWeeklyRepeatEvent: createWeeklyRepeatEventResolver,
    removeMenter: removeMenterResolver,
    submitTrialApplication: submitTrialApplicationResolver,
    updateUserPaymentStatus: updateUserPaymentStatusResolver,
    updateUserRank: updateUserRankResolver,
  },
  Query: {
    getEvents: getEventsResolver,
    getNews: getNewsResolver,
    getRegularUsers: getRegularUsersResolver,
    getStudyLog: getStudyLogResolver,
    getUser: getUserResolver,
    ok: okResolver,
  },
  RegularUser: {
    mentee: menteeResolver,
    menter: menterResolver,
  },
  StudyLog: {
    user: userResolver,
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

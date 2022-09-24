import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { DateResolver } from 'graphql-scalars'
import { join } from 'path'
import type { Resolvers } from './generates/graphql'
import { isoResolver } from './resolvers/DateTime.iso'
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
import { replaceMenterResolver } from './resolvers/Mutation.replaceMenter'

const resolvers: Resolvers = {
  Date: DateResolver,
  DateTime: {
    iso: isoResolver,
  },
  Mutation: {
    addMenter: addMenterResolver,
    createStudyLog: createStudyLogResolver,
    createUser: createUserResolver,
    removeMenter: removeMenterResolver,
    replaceMenter: replaceMenterResolver,
    submitTrialApplication: submitTrialApplicationResolver,
    updateUserPaymentStatus: updateUserPaymentStatusResolver,
    updateUserRank: updateUserRankResolver,
  },
  Query: {
    getNews: getNewsResolver,
    getRegularUsers: getRegularUsersResolver,
    getStudyLog: getStudyLogResolver,
    getUser: getUserResolver,
    ok: okResolver,
  },
  RegularUser: {
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

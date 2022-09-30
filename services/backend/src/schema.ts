import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { DateResolver } from 'graphql-scalars'
import { join } from 'path'
import type { Resolvers } from './generates/graphql'
import { isoResolver } from './resolvers/DateTime.iso'
import { addMenterResolver } from './resolvers/Mutation.addMenter'
import { addUserRolesResolver } from './resolvers/Mutation.addUserRole'
import { createNewsResolver } from './resolvers/Mutation.createNews'
import { createStudyLogResolver } from './resolvers/Mutation.createStudyLog'
import { createUserResolver } from './resolvers/Mutation.createUser'
import { removeMenterResolver } from './resolvers/Mutation.removeMenter'
import { removeUserRoleResolver } from './resolvers/Mutation.removeUserRole'
import { submitTrialApplicationResolver } from './resolvers/Mutation.submitTrialApplication'
import { updateUserPaymentStatusResolver } from './resolvers/Mutation.updateUserPaymentStatus'
import { updateUserRankResolver } from './resolvers/Mutation.updateUserRank'
import { getNewsListResolver } from './resolvers/Query.getNewsList'
import { getRegularUsersResolver } from './resolvers/Query.getRegularUsers'
import { getStudyLogResolver } from './resolvers/Query.getStudyLog'
import { getUserResolver } from './resolvers/Query.getUser'
import { okResolver } from './resolvers/Query.ok'
import { menteeResolver } from './resolvers/RegularUser.mentee'
import { menterResolver } from './resolvers/RegularUser.menter'
import { userResolver } from './resolvers/StudyLog.user'
import { __resolveTypeResolve } from './resolvers/User.__resolveType'

const resolvers: Resolvers = {
  Date: DateResolver,
  DateTime: {
    iso: isoResolver,
  },
  Mutation: {
    addMenter: addMenterResolver,
    addUserRole: addUserRolesResolver,
    createNews: createNewsResolver,
    createStudyLog: createStudyLogResolver,
    createUser: createUserResolver,
    removeMenter: removeMenterResolver,
    removeUserRole: removeUserRoleResolver,
    submitTrialApplication: submitTrialApplicationResolver,
    updateUserPaymentStatus: updateUserPaymentStatusResolver,
    updateUserRank: updateUserRankResolver,
  },
  Query: {
    getNewsList: getNewsListResolver,
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

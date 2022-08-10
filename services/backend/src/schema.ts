import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { join } from 'path'
import type { Resolvers } from './generates/graphql'
import { submitTrialApplicationResolver } from './resolvers/Mutation.submitTrialApplication'
import { updateUserPaymentStatusResolver } from './resolvers/Mutation.updateUserPaymentStatus'
import { updateUserRankResolver } from './resolvers/Mutation.updateUserRank'
import { getNewsResolver } from './resolvers/Query.getNews.resolvers'
import { getRegularUsersResolver } from './resolvers/Query.getRegularUsers'
import { getUserResolver } from './resolvers/Query.getUser'
import { okResolver } from './resolvers/Query.ok'

const resolvers: Resolvers = {
  Mutation: {
    submitTrialApplication: submitTrialApplicationResolver,
    updateUserPaymentStatus: updateUserPaymentStatusResolver,
    updateUserRank: updateUserRankResolver,
  },
  Query: {
    getNews: getNewsResolver,
    getRegularUsers: getRegularUsersResolver,
    getUser: getUserResolver,
    ok: okResolver,
  },
}

export const createSchema = async () => {
  return await loadSchema(join(__dirname, '..', 'schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
    resolvers,
  })
}

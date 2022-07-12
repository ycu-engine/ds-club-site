import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { join } from 'path'
import type { Resolvers } from './generates/graphql'
import { ok } from './resolvers/Query.ok'

const resolvers: Resolvers = {
  Query: {
    ok,
  },
}

export const createSchema = async () => {
  return await loadSchema(join(__dirname, '..', 'schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
    resolvers,
  })
}

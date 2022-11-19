import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'
import type { Context } from './context'
import { createSchema, resolvers } from './schema'

export const createServer = async () => {
  const schema = await createSchema()
  return new ApolloServer<Context>({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    resolvers,
    typeDefs: schema,
  })
}

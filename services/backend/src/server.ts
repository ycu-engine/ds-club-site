import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { createContext } from './context'
import { createSchema } from './schema'

export const createServer = async () => {
  return new ApolloServer({
    context: createContext,
    debug: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await createSchema(),
  })
}

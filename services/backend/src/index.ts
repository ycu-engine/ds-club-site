import { createServer } from './server'
import { startStandaloneServer } from '@apollo/server/standalone'
import type { Context } from './context'
import { createContext } from './context'

const bootstrap = async () => {
  const server = await createServer()

  const { url } = await startStandaloneServer<Context>(server, {
    context: createContext,
    listen: {
      port: Number(process.env['PORT']) || 4000,
    },
  })
  console.info(`🚀 Server ready at ${url}`)
}

void bootstrap()

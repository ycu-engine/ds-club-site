import { createServer } from './server'

const bootstrap = async () => {
  const server = await createServer()

  const { url } = await server.listen()
  console.info(`🚀 Server ready at ${url}`)
}

void bootstrap()

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getIdToken } from 'firebase/auth'
import { auth } from './firebase'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  if (!auth.currentUser) {
    return { headers }
  }
  try {
    const idToken = await getIdToken(auth.currentUser, true)
    return {
      headers: {
        ...headers,
        Authorization: idToken ? `Bearer ${idToken}` : '',
      },
    }
  } catch (error) {
    console.error(error)
    return { headers }
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

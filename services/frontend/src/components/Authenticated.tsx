import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../clients/firebase'
import { LoadingPage } from './LoadingPage'

type AuthenticatedProps = {
  children: ReactNode
}
export const Authenticated = ({ children }: AuthenticatedProps) => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  if (!loading && user) {
    return <>{children}</>
  }

  if (loading) {
    return <LoadingPage />
  }

  void router.push('/login')

  return null
}

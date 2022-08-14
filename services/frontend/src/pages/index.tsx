import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../clients/firebase'
import { Authenticated } from '../components/Authenticated'
import { DefaultLayout } from '../components/DefaultLayout'

const Page = () => {
  const [user] = useAuthState(auth)
  useEffect(() => {
    if (user) {
      void user.getIdToken(true).then((token) => console.log(token))
    }
  }, [user])
  return (
    <Authenticated>
      <DefaultLayout>
        <p>データサイエンスクラブ</p>
      </DefaultLayout>
    </Authenticated>
  )
}

export default Page

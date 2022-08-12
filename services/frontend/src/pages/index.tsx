import { Authenticated } from '../components/Authenticated'
import { DefaultLayout } from '../components/DefaultLayout'

const Page = () => {
  return (
    <Authenticated>
      <DefaultLayout>
        <p>データサイエンスクラブ</p>
      </DefaultLayout>
    </Authenticated>
  )
}

export default Page

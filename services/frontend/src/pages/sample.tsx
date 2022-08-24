import { DefaultLayout } from '../components/DefaultLayout'
import { DSScheduler } from '../modules/scheduler/ds_scheduler'

export default () => {
  return (
    <DefaultLayout>
      <DSScheduler />
    </DefaultLayout>
  )
}

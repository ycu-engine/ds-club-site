import { DefaultLayout } from '../components/DefaultLayout'
import { ThemeProvider, createTheme } from '@mui/material'
import { DSScheduler } from '../modules/scheduler/ds_scheduler'

export default () => {
  return (
    <ThemeProvider theme={createTheme()}>
      <DefaultLayout>
        <DSScheduler />
      </DefaultLayout>
    </ThemeProvider>
  )
}

import { Box, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { DefaultLayout } from '../components/Layout/DefaultLayout'
// import { useState } from 'react'

const Page = () => {
  return (
    <DefaultLayout authenticated={false}>
      <Head>
        <title>会員規約・プライバシーポリシー</title>
      </Head>

      <Box justifyContent="center" p={5}>
        <Heading m={2}>会員規約</Heading>

        <Box
          as="iframe"
          frameBorder="0"
          height={[300, 500]}
          // sandbox="allow-downloads"
          src="https://drive.google.com/file/d/1t2w_F9gUuLnBDpXgjuhJY95Ba_bBxvB0/preview"
          width="70%"
        />

        {/* <Box bg="#FFFFFE" h={300} m={2} mb={6} w={500} /> */}

        {/* <iframe src="https://drive.google.com/file/d/1t2w_F9gUuLnBDpXgjuhJY95Ba_bBxvB0/view?usp=sharing" /> */}

        <Heading m={2}>プライバシーポリシー</Heading>

        {/* <Box textAlign="center"> */}

        {/* sandboxのエラーは解決するのが難しそう */}

        <Box textAlign="center">
          <Box
            as="iframe"
            frameBorder="0"
            height="300px"
            // sandbox="allow-downloads"
            src="https://drive.google.com/file/d/1GWpA2CVbexswcgPnK2lBKQtryX-ZLR5b/preview"
            width="70%"
          />
        </Box>

        {/* </Box> */}

        {/* <Box bg="#FFFFFE" h={300} m={2} w={500} /> */}
      </Box>
    </DefaultLayout>
  )
}

export default Page

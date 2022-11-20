import {
  Container,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { DefaultLayout } from '../../components/Layout/DefaultLayout'
import { AdminOnlyLayout } from '../../modules/userFilter/layouts/AdminOnlyLayout/AdminOnlyLayout'

const links = [
  { href: '/admin/trial-management', label: '体験入会管理ページ' },
  { href: '/admin/members', label: 'メンバー一覧ページ' },
  { href: '/admin/news-management', label: 'お知らせ管理ページ' },
]
const Page: NextPage = () => {
  return (
    <AdminOnlyLayout>
      <DefaultLayout>
        <Head>
          <title>管理者ページ</title>
        </Head>

        <Container>
          <Heading my="5">管理者ページ</Heading>

          <UnorderedList fontSize="xl">
            {links.map(({ href, label }) => (
              <ListItem key={href}>
                <NextLink href={href} passHref>
                  <Link
                    _hover={{
                      color: 'blue.600',
                      textDecoration: 'underline',
                    }}
                    color="blue.500"
                  >
                    {label}
                  </Link>
                </NextLink>
              </ListItem>
            ))}
          </UnorderedList>
        </Container>
      </DefaultLayout>
    </AdminOnlyLayout>
  )
}

export default Page

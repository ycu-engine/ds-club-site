import {
  Container,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { DefaultLayout } from '../../components/Layout/DefaultLayout'
import { AdminOnly } from '../../modules/userFilter/AdminOnly/AdminOnly'

const links = [
  { href: '/admin/trial-management', label: '体験入会管理ページ' },
  { href: '/admin/members', label: 'メンバー一覧ページ' },
]
const Page: NextPage = () => {
  return (
    <AdminOnly>
      <DefaultLayout>
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
    </AdminOnly>
  )
}

export default Page

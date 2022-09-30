// import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Heading, Link, VStack } from '@chakra-ui/react'
import React from 'react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import type { MenteeListFragment } from '../../../generates/graphql'

type MenteeListProps = {
  result: MenteeListFragment
}
export const MenteeList = ({ result }: MenteeListProps) => {
  const name = result.name
  const mentee = result.mentee

  const Inner =
    mentee.length !== 0 ? (
      mentee.map((user) => {
        return (
          <Box fontSize={{ base: 'md', md: 'xl' }} key={user.id}>
            {user.name}

            {' : '}

            <Link color="teal.500" href={`users/${user.id}`}>
              個人ページ
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        )
      })
    ) : (
      <Heading fontSize={{ base: 'md', md: 'xl' }}>
        メンティーがいません
      </Heading>
    )

  return (
    <VStack spacing={10}>
      <Heading fontSize={{ base: 'lg', md: '2xl' }}>
        {name} さんのメンティー一覧
      </Heading>

      {Inner}
    </VStack>
  )
}

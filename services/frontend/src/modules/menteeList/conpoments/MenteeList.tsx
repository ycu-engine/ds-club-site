// import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Heading, Link, VStack } from '@chakra-ui/react'
import React from 'react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import type { MenteeListFragment } from '../../../generates/graphql'

export const MenteeList = ({ name, mentee }: MenteeListFragment) => {
  if (mentee.length === 0) {
    return (
      <VStack spacing={10}>
        <Heading fontSize={{ base: 'lg', md: '2xl' }}>
          {name} さんのメンティー一覧
        </Heading>

        <Heading fontSize={{ base: 'md', md: 'xl' }}>
          メンティーがいません
        </Heading>
      </VStack>
    )
  }

  return (
    <VStack spacing={10}>
      <Heading fontSize={{ base: 'lg', md: '2xl' }}>
        {name} さんのメンティー一覧
      </Heading>

      {mentee.map((_mentee) => {
        return (
          <Box fontSize={{ base: 'md', md: 'xl' }} key={_mentee.name}>
            {_mentee.name}

            {' : '}

            <Link color="teal.500" href={`users/${_mentee.id}`}>
              個人ページ
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        )
      })}
    </VStack>
  )
}

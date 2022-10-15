import { Box, Heading, ListItem, OrderedList } from '@chakra-ui/react'
import { COLORS } from '../../../theme'

export const MaterialNotice = () => {
  return (
    <Box bg={COLORS.white} borderRadius="20" overflow="scroll" p="5">
      <Heading>注意事項</Heading>

      <OrderedList>
        <ListItem>教材はダウンロードして利用してください。</ListItem>

        <ListItem>
          Pythonのコードが付属されていることがあります。その際はお手元でPythonが動く環境を整えて下さい。
        </ListItem>

        <ListItem>教材の共有は禁止です。</ListItem>

        <ListItem>
          教材の共有が発覚した場合、当該教材へのアクセス権が消滅します。また、複数回共有が発覚した場合は除名処分や金銭等の要求を行うなど厳しい処分を課します。
        </ListItem>
      </OrderedList>
    </Box>
  )
}

import { Box, Center } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { COLORS } from '../../../theme'

type MaterialPreviewProps = {
  material?: ReactNode | null
}
export const MaterialPreview = ({ material }: MaterialPreviewProps) => {
  return (
    <Box bg={COLORS.white} borderRadius="20" p="5" w="full">
      {material ? material : <Center>教材を選択してください</Center>}
    </Box>
  )
}

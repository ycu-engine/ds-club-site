import {
  Checkbox,
  Container,
  Heading,
  useBoolean,
  Text,
  VStack,
  Button,
  Box,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { COLORS } from '../../../theme'
import { MaterialNotice } from '../components/MaterialNotice'
import { MaterialPreview } from '../components/MaterialPreview'
import { MaterialSelecter } from '../components/MaterialSelecter'

const materials = [
  {
    id: '1',
    name: 'Material 1',
  },
  {
    id: '2',
    name: 'Material 2',
  },
]

export const MaterialsPage = () => {
  const [isChecked, setIsChecked] = useBoolean(false)
  const { control, watch } = useForm<{ material: string | undefined }>()
  const selectedMaterial = watch('material')
  useEffect(() => {
    console.info('selectedMaterial', selectedMaterial)
  }, [selectedMaterial])

  return (
    <Box p="5">
      <Heading>教材ページ</Heading>

      <Text as="h2">教材の閲覧が可能なページになります。</Text>

      <Container as={VStack} gap={5}>
        <MaterialSelecter control={control} materials={materials} />

        <MaterialPreview material={null} />

        <MaterialNotice />

        <Checkbox isChecked={isChecked} onChange={() => setIsChecked.toggle()}>
          注意事項を確認しました
        </Checkbox>

        <Button
          _hover={{ opacity: 0.8 }}
          bg={COLORS.orange}
          color={COLORS.white}
          isDisabled={!isChecked}
        >
          教材をダウンロード
        </Button>
      </Container>
    </Box>
  )
}

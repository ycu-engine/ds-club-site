import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useCreateNewsModalMutation } from 'generates/graphql'
import { SubmitHandler, useForm } from 'react-hook-form'

type CreateNewsFormValues = {
  title: string
  body: string
}
type CreateNewsModalProps = {
  onSubmitCallback?: () => void
}
export const CreateNewsForm = ({ onSubmitCallback }: CreateNewsModalProps) => {
  const toast = useToast()
  const [createNewsModalMutation, { loading, error }] =
    useCreateNewsModalMutation({
      onCompleted: () => {
        toast({
          duration: 3000,
          isClosable: true,
          status: 'success',
          title: 'お知らせを作成しました',
        })
        reset()
        onSubmitCallback?.()
      },
      onError: () => {
        console.error(error)
        toast({
          duration: 3000,
          isClosable: true,
          status: 'error',
          title: error?.message,
        })
      },
    })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNewsFormValues>()
  const onSubmit: SubmitHandler<CreateNewsFormValues> = (form) => {
    void createNewsModalMutation({
      variables: {
        input: form,
      },
    })
  }

  return (
    <VStack
      as="form"
      id="make-news-form"
      onSubmit={handleSubmit(onSubmit)}
      spacing="4"
    >
      <FormControl isInvalid={Boolean(errors.title)} isRequired>
        <FormLabel>タイトル</FormLabel>

        <Input
          disabled={loading}
          id="title"
          placeholder="タイトル"
          {...register('title', { required: true })}
        />

        <FormErrorMessage>
          {errors.title ? 'タイトルは必須です' : null}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.body)} isRequired>
        <FormLabel>本文</FormLabel>

        <Textarea
          disabled={loading}
          id="body"
          placeholder="本文"
          size="lg"
          {...register('body', { required: true })}
        />

        <FormErrorMessage>
          {errors.body ? '本文は必須です' : null}
        </FormErrorMessage>
      </FormControl>
    </VStack>
  )
}

export const MakeNewsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme="orange" onClick={onOpen}>
        お知らせを作成する
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <CreateNewsForm onSubmitCallback={onClose} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              form="make-news-form"
              mr={3}
              type="submit"
            >
              作成する
            </Button>

            <Button onClick={onClose} variant="ghost">
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

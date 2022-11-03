import { Button, VStack } from '@chakra-ui/react'
import { UserRole } from '../../../generates/graphql'

type AddButtonProps = {
  userId: string
  addUserRole(userId: string, role: UserRole): () => unknown
}

export const AddButton = ({ userId, addUserRole }: AddButtonProps) => {
  return (
    <VStack>
      <Button
        onClick={() => {
          addUserRole(userId, UserRole.Admin)
        }}
      >
        ADMIN
      </Button>

      <Button
        onClick={() => {
          addUserRole(userId, UserRole.Staff)
        }}
      >
        STAFF
      </Button>

      <Button
        onClick={() => {
          addUserRole(userId, UserRole.Treasurer)
        }}
      >
        TREASURER
      </Button>

      <Button
        onClick={() => {
          addUserRole(userId, UserRole.Menter)
        }}
      >
        MENTER
      </Button>
    </VStack>
  )
}

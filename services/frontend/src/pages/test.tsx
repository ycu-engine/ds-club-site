import { DeleteButton } from 'components/Button/deleteButton'

const Page = () => {
  return (
    <DeleteButton
      onClick={() => {
        console.info('Delete button clicked')
      }}
    />
  )
}

export default Page

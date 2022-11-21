import type { MutationFunction } from '@apollo/client'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  type ButtonProps,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
  Square,
} from '@chakra-ui/react'
import { useTimer } from 'react-timer-hook'

type DeleteButtonProps = {
  onClick: MutationFunction
} & Omit<ButtonProps, 'onClick'>
export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  const getExpirationTime = (seconds: number) => {
    const now = new Date()
    now.setSeconds(now.getSeconds() + seconds)
    return now
  }
  const { seconds, isRunning, pause, restart } = useTimer({
    autoStart: false,
    expiryTimestamp: getExpirationTime(3),
    onExpire: async () => {
      await onClick()
    },
  })

  return (
    <Square display="inline-block" size="50px">
      {isRunning ? (
        <CircularProgress color="red.400" isIndeterminate onClick={pause}>
          <CircularProgressLabel>{seconds}</CircularProgressLabel>
        </CircularProgress>
      ) : (
        <IconButton
          aria-label="Delete"
          fontSize="20px"
          icon={<DeleteIcon />}
          onClick={() => {
            restart(getExpirationTime(3))
          }}
          variant="tertiary"
        />
      )}
    </Square>
  )
}

import type { MutationFunction } from '@apollo/client'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  type ButtonProps,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
  Square,
  Tooltip,
} from '@chakra-ui/react'
import { useTimer } from 'react-timer-hook'

type DeleteButtonProps = {
  onClick: MutationFunction
} & Omit<ButtonProps, 'onClick'>
export const DeleteButton = ({ onClick, ...props }: DeleteButtonProps) => {
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
        <Tooltip label="クリックして中止">
          <CircularProgress
            _hover={{ cursor: 'pointer' }}
            color="red.400"
            isIndeterminate
            onClick={pause}
          >
            <CircularProgressLabel fontSize="lg" fontWeight="bold">
              {seconds}
            </CircularProgressLabel>
          </CircularProgress>
        </Tooltip>
      ) : (
        <IconButton
          aria-label="Delete"
          fontSize="20px"
          icon={<DeleteIcon />}
          onClick={() => {
            restart(getExpirationTime(3))
          }}
          variant="tertiary"
          {...props}
        />
      )}
    </Square>
  )
}

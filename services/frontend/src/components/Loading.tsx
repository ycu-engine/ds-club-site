import { Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { MotionStyle } from 'framer-motion'

const MotionDivStyle: MotionStyle = {
  alignItems: 'center',
  background: '#EFF0F3',
  bottom: 0,
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
}

export const Loading: React.FC = () => {
  return (
    <motion.div style={MotionDivStyle}>
      <Text color="orange.500" fontSize="5xl">
        Now Loading...
      </Text>

      <br />

      <motion.div
        animate={{
          rotate: [0, 0, 270, 270, 0],
          x: [-70, 70],
        }}
        style={{
          background: '#E81B63',
          borderRadius: '20%',
          height: '60px',
          width: '60px',
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          flip: Infinity,
        }}
      />
    </motion.div>
  )
}

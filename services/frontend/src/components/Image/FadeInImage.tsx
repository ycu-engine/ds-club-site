import { Box, BoxProps, useBoolean } from '@chakra-ui/react'
import Image, { ImageProps } from 'next/image'

type FadeInImageProps = {
  duration?: number | string
  width?: BoxProps['width']
  height?: BoxProps['height']
} & Omit<ImageProps, 'width' | 'height'>
export const FadeInImage = ({
  src,
  duration = 0.5,
  width,
  height,
  ...props
}: FadeInImageProps) => {
  const [imageLoading, setImageLoading] = useBoolean(true)
  return (
    <Box h={height || '100%'} position="relative" w={width || '100%'}>
      <Image
        layout="fill"
        objectFit="contain"
        onLoadingComplete={() => setImageLoading.off()}
        src={src}
        style={
          imageLoading ? { opacity: 0 } : { transition: `opacity ${duration}s` }
        }
        {...props}
      />
    </Box>
  )
}

import { useBoolean } from '@chakra-ui/react'
import Image, { StaticImageData, ImageProps } from 'next/image'

type FadeInImageProps = {
  src: StaticImageData
  duration?: number | string
} & Omit<ImageProps, 'src'>
export const FadeInImage = ({
  src,
  duration = 1,
  ...props
}: FadeInImageProps) => {
  const [imageLoading, setImageLoading] = useBoolean(true)
  return (
    <Image
      height={src.height}
      layout="responsive"
      onLoadingComplete={() => setImageLoading.off()}
      src={src.src}
      style={
        imageLoading ? { opacity: 0 } : { transition: `opacity ${duration}s` }
      }
      width={src.width}
      {...props}
    />
  )
}

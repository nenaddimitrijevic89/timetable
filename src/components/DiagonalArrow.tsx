import Image, { ImageProps } from 'next/image'

import diagonalArrow from '../assets/diagonal-arrow.svg'

export const DiagonalArrow = (props: Partial<ImageProps>) => {
  return (
    <Image
      src={diagonalArrow}
      width={16}
      height={16}
      alt='diagonal arrow'
      {...props}
    />
  )
}

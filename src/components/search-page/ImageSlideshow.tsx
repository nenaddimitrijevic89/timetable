'use client'

import Image from 'next/image'

import class1 from '@/@@/assets/image-slideshow/classes-1.jpg'
import class2 from '@/@@/assets/image-slideshow/classes-2.jpg'
import class3 from '@/@@/assets/image-slideshow/classes-3.jpg'
import class4 from '@/@@/assets/image-slideshow/classes-4.jpg'
import class5 from '@/@@/assets/image-slideshow/classes-5.jpg'
import class6 from '@/@@/assets/image-slideshow/classes-6.jpg'
import { useEffect, useState } from 'react'

const slideshowImages = [class1, class2, class3, class4, class5, class6]

export const ImageSlideshow = () => {
  const [mainImage, setMainImage] = useState(class1)

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * slideshowImages.length)
      setMainImage(slideshowImages[randomIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='relative mb-10 flex h-[400px] w-full items-end justify-center overflow-hidden'>
      <div className='absolute left-0 right-0 h-full w-full'>
        <Image
          src={mainImage}
          alt='slider image'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='relative mb-8 flex gap-4'>
        {slideshowImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`h-8 w-8 cursor-pointer overflow-hidden shadow-2xl sm:h-10 sm:w-10 md:w-20 ${
              mainImage === image ? 'border-2 border-orange' : ''
            }`}
            onClick={() => setMainImage(image)}
          >
            <Image
              src={image}
              alt='slider image'
              className='h-full w-full object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

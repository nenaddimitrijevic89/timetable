import Image from 'next/image'
import { ButtonHTMLAttributes } from 'react'

import arrow from '@/@@/assets/arrow-right.svg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftArrow?: boolean
  rightArrow?: boolean
}

export const Button = ({
  leftArrow,
  rightArrow,
  children,
  ...props
}: Props) => {
  return (
    <div
      className={`flex gap-2 border border-[#2D2D2D] p-3 px-4 ${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {leftArrow && (
        <Image
          src={arrow}
          className={`w-3 rotate-180 ${props.disabled ? 'opacity-50' : ''}`}
          alt='left arrow'
        />
      )}
      <button
        {...props}
        className='text-white disabled:cursor-not-allowed disabled:opacity-50'
      >
        {children}
      </button>
      {rightArrow && (
        <Image
          src={arrow}
          className={`w-3 ${props.disabled ? 'opacity-50' : ''}`}
          alt='right arrow'
        />
      )}
    </div>
  )
}

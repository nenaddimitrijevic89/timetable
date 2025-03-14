import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import filter from '@/@@/assets/filter.svg'

interface Props {
  onClick: () => void
  className?: string
}

export const FilterButton = ({ onClick, className }: Props) => {
  return (
    <div
      className={twMerge(
        'flex cursor-pointer gap-3 bg-white px-3 py-2 transition duration-300 ease-in-out hover:bg-orange',
        className,
      )}
      onClick={onClick}
    >
      <span className='font-medium'>Filter</span>
      <Image src={filter} alt='filter icon' />
    </div>
  )
}

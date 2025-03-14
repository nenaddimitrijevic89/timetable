import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { TClass } from '../../types'
import { DiagonalArrow } from '../DiagonalArrow'
import { CategoryColorBullet } from '../CategoryColorBullet'

interface Props {
  classItem: TClass
  className?: string
}

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const ClassCard = ({ classItem, className }: Props) => {
  const categories = classItem?.categories?.map((category) => category.slug)

  return (
    <Link href={`/${classItem.slug}`} key={classItem.id}>
      <div
        className={twMerge(
          'flex justify-between gap-3 border-t border-[#2d2d2d] py-5',
          className,
        )}
      >
        <div className='flex flex-col gap-2 md:w-[60%]'>
          <h1 className='text-xl font-bold uppercase text-white md:text-2xl'>
            {classItem.title}
          </h1>
          <p className='line-clamp-2 text-sm text-[#BDBDBD] md:text-lg'>
            {classItem?.excerpt || loremIpsum}
          </p>
          <div className='flex gap-4'>
            {categories.map((category, i) => (
              <div key={`${category}-${i}`} className='flex items-center gap-2'>
                <CategoryColorBullet categorySlug={category} />
                <span className='text-xs text-white md:text-sm'>
                  {category.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <DiagonalArrow />
      </div>
    </Link>
  )
}

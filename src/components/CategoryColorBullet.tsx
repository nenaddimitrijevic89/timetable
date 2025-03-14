import { twMerge } from 'tailwind-merge'
import { CATEGORY_COLORS } from '../constants/categoryColors'
import { ECategory } from '../types'

interface Props {
  categorySlug: ECategory
  className?: string
}

export const CategoryColorBullet = ({ categorySlug, className }: Props) => {
  const backgroundColor = CATEGORY_COLORS[categorySlug]
  return (
    <div
      className={twMerge('h-[14px] w-[14px] rounded-full', className)}
      style={{ backgroundColor: backgroundColor }}
    />
  )
}

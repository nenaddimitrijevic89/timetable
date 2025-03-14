import { TCategory } from '../../types'
import { CategoriesBgAnimation } from './CategoriesBgAnimation'
import { CategoryCard } from './CategoryCard'

interface Props {
  categories: TCategory[]
}

export const Categories = ({ categories }: Props) => {
  return (
    <div className='grid gap-5 bg-gradient-to-t from-black from-50% to-transparent pt-0 xl:gap-0 xl:pt-20'>
      {categories.map((category, index) => (
        <CategoryCard
          key={`${category.id}-${index}`}
          category={category}
          index={index}
        />
      ))}
      <CategoriesBgAnimation />
    </div>
  )
}

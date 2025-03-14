import { ECategory, TCategory, TGym } from '@/@@/types'
import { FilterItem } from './FilterItem'

interface Props {
  gymFilters: string[]
  categoryFilters: ECategory[]
  gyms: TGym[]
  categories: TCategory[]
  onGymClick: (gym: string) => void
  onCategoryClick: (category: ECategory) => void
}

export const FilterList = ({
  gymFilters,
  categoryFilters,
  gyms,
  categories,
  onGymClick,
  onCategoryClick,
}: Props) => (
  <>
    {gymFilters.map((filter, i) => (
      <FilterItem
        key={`${filter}-${i}`}
        filter={gyms.find((gym) => gym.slug === filter)?.title || filter}
        onClick={() => onGymClick(filter)}
        className='hidden lg:flex'
      />
    ))}
    {categoryFilters.map((filter, i) => (
      <FilterItem
        key={`${filter}-${i}`}
        filter={
          categories.find((category) => category.slug === filter)?.title ||
          filter
        }
        onClick={() => onCategoryClick(filter)}
        className='hidden lg:flex'
      />
    ))}
  </>
)

'use client'

import { ChangeEvent, Suspense, useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { ECategory, TCategory, TClass, TGym } from '@/@@/types'
import { ClassCard } from '../class/ClassCard'
import { LoadingSpinner } from '../LoadingSpinner'
import { FilterButton } from './FilterButton'
import { FilterDropdown } from './FilterDropdown'
import { SearchField } from './SearchField'
import { ImageSlideshow } from './ImageSlideshow'

interface Props {
  classes: TClass[]
  gyms: TGym[]
  categories: TCategory[]
}

const SearchComponent = ({ classes, gyms, categories }: Props) => {
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedGyms, setSelectedGyms] = useState<TGym['slug'][]>([])
  const [selectedCategories, setSelectedCategories] = useState<ECategory[]>([])
  const [searchValue, setSearchValue] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const gym = searchParams.get('gym')
  const category = searchParams.get('category')

  useEffect(() => {
    if (gym) {
      setSelectedGyms(gym.split(' '))
    }
    if (category) {
      setSelectedCategories(category.split(' ') as ECategory[])
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateURLWithFilters = useCallback(() => {
    const newParams = new URLSearchParams()
    if (selectedGyms.length > 0) {
      newParams.set('gym', selectedGyms.join(' '))
    }
    if (selectedCategories.length > 0) {
      newParams.set('category', selectedCategories.join(' '))
    }
    router.push(`?${newParams.toString()}`)
  }, [selectedGyms, selectedCategories, router])

  useEffect(() => {
    updateURLWithFilters()
  }, [updateURLWithFilters, selectedCategories, selectedGyms])

  const handleGymFilters = (gymSlug: string) => {
    if (selectedGyms.includes(gymSlug)) {
      const filtered = selectedGyms.filter((slug) => slug !== gymSlug)
      setSelectedGyms(filtered)
      return
    }

    setSelectedGyms([...selectedGyms, gymSlug])
  }

  const handleCategoryFilters = (categorySlug: ECategory) => {
    if (selectedCategories.includes(categorySlug)) {
      const filtered = selectedCategories.filter(
        (slug) => slug !== categorySlug,
      )
      setSelectedCategories(filtered)
      return
    }

    setSelectedCategories([...selectedCategories, categorySlug])
  }

  const filteredClasses = classes.filter((cls) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      cls.categories.some((category) =>
        selectedCategories.includes(category.slug),
      )

    const matchesGym =
      selectedGyms.length === 0 ||
      cls.timetables.some((timetable) =>
        selectedGyms.includes(timetable.gym.toLowerCase().replace(' ', '-')),
      )

    const matchesSearchValue =
      searchValue === '' ||
      cls.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      cls.excerpt?.toLowerCase().includes(searchValue.toLowerCase())

    return matchesCategory && matchesGym && matchesSearchValue
  })

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className='px-0 lg:px-24'>
      <div className='fixed top-10 z-10 flex gap-5 pl-14 lg:pl-0'>
        <FilterButton
          onClick={() => setDropdownOpen(true)}
          className={`${dropdownOpen ? 'hidden' : 'flex'}`}
        />
        <SearchField
          className={`${dropdownOpen ? 'hidden' : 'flex'} hidden sm:flex`}
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </div>
      <FilterDropdown
        isOpen={dropdownOpen}
        onClose={() => setDropdownOpen(false)}
        selectedGyms={selectedGyms}
        selectedCategories={selectedCategories}
        gyms={gyms}
        categories={categories}
        searchValue={searchValue}
        handleGymFilters={handleGymFilters}
        handleCategoryFilters={handleCategoryFilters}
        handleSearch={setSearchValue}
      />
      <ImageSlideshow />
      {filteredClasses.map((cls: TClass, index: number) => (
        <ClassCard
          key={`${cls.id}-${index}`}
          classItem={cls}
          className={
            filteredClasses.length === index + 1 ? 'last:border-b' : ''
          }
        />
      ))}
    </div>
  )
}

export const Search = (props: Props) => (
  <Suspense fallback={<LoadingSpinner />}>
    <SearchComponent {...props} />
  </Suspense>
)

'use client'

import { ChangeEvent } from 'react'
import Image from 'next/image'

import close from '@/@@/assets/close.svg'
import { ECategory, TCategory, TGym } from '@/@@/types'
import { CategoryColorBullet } from '../CategoryColorBullet'
import { FilterButton } from './FilterButton'
import { FilterList } from './FilterList'
import { SearchField } from './SearchField'
import { timePeriodOptions } from '@/@@/constants/timePeriodOptions'

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedGyms: TGym['slug'][]
  selectedCategories: ECategory[]
  selectedTimePeriods: string[]
  gyms: TGym[]
  categories: TCategory[]
  searchValue: string
  handleGymFilters: (gymSlug: TGym['slug']) => void
  handleCategoryFilters: (categorySlug: ECategory) => void
  handleTimePeriodFilters: (timePeriod: string) => void
  handleSearch: (searchValue: string) => void
}

export const FilterDropdown = ({
  isOpen,
  onClose,
  selectedGyms,
  selectedCategories,
  selectedTimePeriods,
  gyms,
  categories,
  searchValue,
  handleGymFilters,
  handleCategoryFilters,
  handleTimePeriodFilters,
  handleSearch,
}: Props) => {
  const isGymActive = (gymSlug: string) => selectedGyms.includes(gymSlug)
  const isCategoryActive = (categorySlug: ECategory) =>
    selectedCategories.includes(categorySlug)

  const isTimePeriodActive = (timePeriod: string) =>
    selectedTimePeriods.includes(timePeriod)

  return (
    <div
      onClick={onClose}
      className={`fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-70 transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='z-20 flex w-full flex-col gap-5 bg-[#131313] px-5 pb-7 pt-10 sm:px-10 lg:px-[136px]'
      >
        <div className='flex flex-wrap gap-2'>
          <div className='flex gap-5'>
            <FilterButton onClick={onClose} className='bg-orange' />
            <SearchField
              className='flex lg:hidden'
              value={searchValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
              }
            />
          </div>
          <FilterList
            gymFilters={selectedGyms}
            categoryFilters={selectedCategories}
            gyms={gyms}
            categories={categories}
            onGymClick={handleGymFilters}
            onCategoryClick={handleCategoryFilters}
          />
        </div>
        <div className='flex gap-10'>
          <div className='flex flex-col gap-3 sm:gap-5'>
            <span className='font-semibold text-white'>Locations</span>
            <div className='flex flex-col gap-1'>
              {gyms.map((gym) => (
                <div
                  key={gym.id}
                  className={`flex cursor-pointer gap-2 py-1 transition duration-300 ease-in-out ${
                    isGymActive(gym.slug)
                      ? 'w-fit bg-white px-2 text-black hover:bg-orange'
                      : 'text-white hover:text-orange'
                  }`}
                  onClick={() => handleGymFilters(gym.slug)}
                >
                  <span>{gym.title}</span>
                  {isGymActive(gym.slug) && (
                    <Image src={close} className='w-2' alt='close icon' />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <span className='font-semibold text-white'>Category</span>
            <div className='flex flex-col gap-1'>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex cursor-pointer items-center gap-2 py-1 transition duration-300 ease-in-out ${
                    isCategoryActive(category.slug)
                      ? 'w-fit bg-white px-2 text-black hover:bg-orange'
                      : 'text-white hover:text-orange'
                  }`}
                  onClick={() => handleCategoryFilters(category.slug)}
                >
                  <CategoryColorBullet
                    categorySlug={category.slug}
                    className='h-3 w-3'
                  />
                  <span>{category.title}</span>
                  {isCategoryActive(category.slug) && (
                    <Image src={close} className='w-2' alt='close icon' />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-3 sm:gap-5'>
            <span className='font-semibold text-white'>Time period</span>
            <div className='flex flex-col gap-1'>
              {timePeriodOptions.map((time, index) => (
                <div
                  key={`${time}-${index}`}
                  className={`flex cursor-pointer gap-2 py-1 transition duration-300 ease-in-out ${
                    isTimePeriodActive(time.value)
                      ? 'w-fit bg-white px-2 text-black hover:bg-orange'
                      : 'text-white hover:text-orange'
                  }`}
                  onClick={() => handleTimePeriodFilters(time.value)}
                >
                  <span>{time.label}</span>
                  {isTimePeriodActive(time.value) && (
                    <Image src={close} className='w-2' alt='close icon' />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

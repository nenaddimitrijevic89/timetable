'use client'

import {
  ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import {
  ECategory,
  TCategory,
  TGym,
  TTimetable,
  TTimetableMap,
} from '@/@@/types'
import { useMediaQuery } from '@/@@/hooks/useMediaQuery'
import { getDayLabel, getIsToday } from '@/@@/services/getDayLabel'
import { getTimePeriod } from '@/@@/services/getTimePeriod'
import { CategoryColorBullet } from '../CategoryColorBullet'
import { LoadingSpinner } from '../LoadingSpinner'
import { Button } from '../Button'
import { FilterDropdown } from './FilterDropdown'
import { FilterActions } from './FilterActions'
import { GymSelectOverlay } from './GymSelectOverlay'

interface Props {
  gyms: TGym[]
  categories: TCategory[]
  timetableMap: TTimetableMap
}

const TimetableComponent = ({ gyms, categories, timetableMap }: Props) => {
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedGyms, setSelectedGyms] = useState<TGym['slug'][]>([])
  const [selectedCategories, setSelectedCategories] = useState<ECategory[]>([])
  const [selectedTimePeriods, setSelectedTimePeriods] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOverlayOpen, setIsOverlayOpen] = useState(true)
  const isMobile = useMediaQuery('(max-width: 1024px)')

  const itemsPerPage = 5

  const router = useRouter()
  const searchParams = useSearchParams()
  const gym = searchParams.get('gym')
  const category = searchParams.get('category')
  const time = searchParams.get('time')

  useEffect(() => {
    if (gym) {
      setSelectedGyms(gym.split(' '))
    }
    if (category) {
      setSelectedCategories(category.split(' ') as ECategory[])
    }
    if (time) {
      setSelectedTimePeriods(time.split(' '))
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
    if (selectedTimePeriods.length > 0) {
      newParams.set('time', selectedTimePeriods.join(' '))
    }
    router.push(`?${newParams.toString()}`)
  }, [selectedGyms, selectedCategories, selectedTimePeriods, router])

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

  const handleTimePeriodFilters = (timePeriod: string) => {
    if (selectedTimePeriods.includes(timePeriod)) {
      const filtered = selectedTimePeriods.filter(
        (period) => period !== timePeriod,
      )
      setSelectedTimePeriods(filtered)
      return
    }

    setSelectedTimePeriods([...selectedTimePeriods, timePeriod])
  }

  const filteredTimetableMap = useMemo(() => {
    const categorySet = new Set(selectedCategories)
    const gymSet = new Set(selectedGyms)
    const timePeriodSet = new Set(selectedTimePeriods)
    const searchValueLower = searchValue.toLowerCase()

    const filterByCategory = (timetable: TTimetable[]) => {
      if (categorySet.size === 0) return timetable
      return timetable.filter((item) =>
        item.categories.some((category) => categorySet.has(category.slug)),
      )
    }

    const filterByGym = (timetable: TTimetable[]) => {
      if (gymSet.size === 0) return timetable
      return timetable.filter((item) =>
        gymSet.has(item.gym.toLowerCase().replace(' ', '-')),
      )
    }

    const filterByTimePeriod = (timetable: TTimetable[]) => {
      if (timePeriodSet.size === 0) return timetable
      return timetable.filter((item) =>
        timePeriodSet.has(getTimePeriod(item.time)),
      )
    }

    const filterBySearchValue = (timetable: TTimetable[]) => {
      if (searchValueLower === '') return timetable
      return timetable.filter((item) =>
        item?.name?.toLowerCase().includes(searchValueLower),
      )
    }

    return Object.entries(timetableMap).reduce((acc, [date, timetable]) => {
      let filteredTimetable = timetable

      filteredTimetable = filterByCategory(filteredTimetable)
      filteredTimetable = filterByGym(filteredTimetable)
      filteredTimetable = filterByTimePeriod(filteredTimetable)
      filteredTimetable = filterBySearchValue(filteredTimetable)

      if (filteredTimetable.length > 0) {
        acc[date] = filteredTimetable
      }

      return acc
    }, {} as TTimetableMap)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedGyms, selectedTimePeriods, searchValue])

  const handleNext = () => {
    if (
      currentIndex + itemsPerPage <
      Object.keys(filteredTimetableMap).length
    ) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const visibleTimetableMap = isMobile
    ? Object.entries(filteredTimetableMap)
    : Object.entries(filteredTimetableMap).slice(
        currentIndex,
        currentIndex + itemsPerPage,
      )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      {isOverlayOpen && selectedGyms.length === 0 && (
        <GymSelectOverlay
          gyms={gyms}
          onClick={handleGymFilters}
          onClose={() => setIsOverlayOpen(false)}
        />
      )}
      <div className='px-0 lg:px-24'>
        <FilterActions
          isOpen={dropdownOpen}
          searchValue={searchValue}
          onClick={() => setDropdownOpen(true)}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
        <FilterDropdown
          isOpen={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
          selectedGyms={selectedGyms}
          selectedCategories={selectedCategories}
          selectedTimePeriods={selectedTimePeriods}
          gyms={gyms}
          categories={categories}
          searchValue={searchValue}
          handleGymFilters={handleGymFilters}
          handleCategoryFilters={handleCategoryFilters}
          handleTimePeriodFilters={handleTimePeriodFilters}
          handleSearch={setSearchValue}
        />
      </div>
      <div className='flex flex-col gap-5'>
        <div className='hidden justify-between lg:flex'>
          <Button
            disabled={currentIndex === 0}
            leftArrow
            onClick={handlePrevious}
          >
            Prev day
          </Button>
          <Button
            disabled={
              currentIndex + itemsPerPage >=
              Object.keys(filteredTimetableMap).length
            }
            onClick={handleNext}
            rightArrow
          >
            Next day
          </Button>
        </div>
        <div className='scrollbar-hide grid w-max grid-cols-8 overflow-x-scroll lg:w-full lg:grid-cols-5'>
          {visibleTimetableMap.map(([date, timetables]) => (
            <div
              key={date}
              className={`flex flex-col gap-5 p-[10px] ${getIsToday(date) ? 'bg-[#141414]' : ''}`}
            >
              <div className='border-b border-[#2D2D2D] pb-2'>
                <h2
                  className={`text-sm font-bold uppercase ${getIsToday(date) ? 'text-orange' : 'text-white'}`}
                >
                  {getDayLabel(date)}
                </h2>
              </div>
              {timetables.map((timetable) => {
                return (
                  <div
                    key={timetable.id}
                    className='flex flex-col gap-2 border border-[#2D2D2D] p-2'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-[#BDBDBD]'>
                        {timetable.time} ({timetable.duration})
                      </span>
                    </div>
                    <a
                      href={`https://www.gymbox.com/gyms/${timetable?.gym.toLowerCase().replace(/ /g, '-')}`}
                      // target='_blank'
                      // rel='noreferrer'
                    >
                      <p className='text-xs text-white transition duration-300 ease-in-out hover:text-orange'>
                        {timetable.gym}
                      </p>
                    </a>
                    <Link href={`/${timetable?.class?.slug}`}>
                      <p className='text-sm font-medium uppercase text-white transition duration-300 ease-in-out hover:text-orange'>
                        {timetable?.name || ''}
                      </p>
                    </Link>
                    <div className='flex gap-2'>
                      {timetable?.categories?.map((category, i) => (
                        <div
                          key={`${category.slug}-${i}`}
                          className='flex items-center gap-1'
                        >
                          <CategoryColorBullet
                            className='h-[10px] w-[10px]'
                            categorySlug={category.slug}
                          />
                          <span className='text-[10px] text-white'>
                            {category.slug.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const Timetable = (props: Props) => (
  <Suspense fallback={<LoadingSpinner />}>
    <TimetableComponent {...props} />
  </Suspense>
)

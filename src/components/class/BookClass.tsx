'use client'

import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import arrowRight from '@/@@/assets/arrow-right.svg'
import { TClass, TOption } from '@/@@/types'
import { Select } from '../Select'

dayjs.extend(advancedFormat)

interface Props {
  classItem: TClass
}

export const BookClass = ({ classItem }: Props) => {
  const [selectedGym, setSelectedGym] = useState<string>('')
  const [selectedSlotId, setSelectedSlotId] = useState<string>('')
  const [timetableOptions, setTimetableOptions] = useState<TOption[]>([])

  const handleGymChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGym(e.target.value)

    const filteredTimetables = timetables.filter(
      (timetable) => timetable.gym.toLowerCase() === e.target.value,
    )

    const options = filteredTimetables.map((timetable) => {
      const date = dayjs(timetable.date)
      const time = timetable.time
      const day = date.format('dddd')
      const dayOfMonth = date.format('Do')
      const duration = timetable.duration
      const disabled = date.isBefore(dayjs()) || timetable.capacity === 0
      const isFullClass = timetable.capacity === 0

      return {
        label: `${time} ${day} ${dayOfMonth} (${duration})${
          isFullClass ? ' - Class full' : ''
        }`,
        value: timetable.id.toString(),
        disabled,
      }
    })

    setTimetableOptions(options)
  }

  const handleTimetableSlotChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSlotId(e.target.value)
  }

  const timetables = classItem.timetables

  const gyms = [...new Set(timetables.map((timetable) => timetable.gym))]

  const gymOptions = gyms.map((location) => ({
    label: location,
    value: location.toLowerCase(),
  }))

  const buttonDisabled = !selectedGym && !selectedSlotId
  const bookingLink = `https://gymbox.legendonlineservices.co.uk/enterprise/Basket/AddPublicClassBooking?bookingId=${selectedSlotId}`

  return (
    <div className='grid grid-cols-2'>
      <Select
        options={gymOptions}
        placeholder='Select gym'
        onChange={handleGymChange}
        value={selectedGym}
      />
      <Select
        options={timetableOptions}
        placeholder='Choose time'
        className='border-l-0 disabled:cursor-not-allowed'
        onChange={handleTimetableSlotChange}
        disabled={!selectedGym}
      />
      <a
        href={buttonDisabled ? undefined : bookingLink}
        target='_blank'
        className={`group col-span-2 flex justify-between border border-t-0 border-[#2D2D2D] bg-black px-4 py-[14px] text-sm font-semibold text-white hover:bg-[#2D2D2D] ${
          buttonDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        <span className='uppercase group-hover:text-orange'>Book class?</span>
        <Image src={arrowRight} alt='right-arrow' />
      </a>
    </div>
  )
}

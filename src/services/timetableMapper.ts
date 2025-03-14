import { TTimetable, TTimetableMap } from '../types'

// const days = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
// ]

// function getDayName(dayOfWeek: number, currentDate: Date): string {
//   const today = currentDate.getDay()
//   const dayDifference = (dayOfWeek - today + 7) % 7

//   if (dayDifference === 0) return 'today'
//   if (dayDifference === 1) return 'tomorrow'
//   return days[dayOfWeek]
// }

export const timetableMapper = (timetable: TTimetable[]): TTimetableMap => {
  const timetableMap = timetable.reduce((acc, curr) => {
    const date = curr.date

    if (!acc[date]) {
      acc[date] = []
    }

    acc[date].push(curr)

    return acc
  }, {} as TTimetableMap)

  return timetableMap
}

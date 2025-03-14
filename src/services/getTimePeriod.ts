import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

const timePeriods = {
  morning: { start: '06:00', end: '13:00' },
  lunchTime: { start: '13:00', end: '19:00' },
  evening: { start: '19:00', end: '23:59' },
}

const parseTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return { hours, minutes }
}

const isTimeBetween = (
  time: { hours: number; minutes: number },
  start: { hours: number; minutes: number },
  end: { hours: number; minutes: number },
) => {
  const timeInMinutes = time.hours * 60 + time.minutes
  const startInMinutes = start.hours * 60 + start.minutes
  const endInMinutes = end.hours * 60 + end.minutes

  return timeInMinutes >= startInMinutes && timeInMinutes < endInMinutes
}

export const getTimePeriod = (time: string): string => {
  const timeObj = parseTime(time)

  if (
    isTimeBetween(
      timeObj,
      parseTime(timePeriods.morning.start),
      parseTime(timePeriods.morning.end),
    )
  ) {
    return 'morning'
  } else if (
    isTimeBetween(
      timeObj,
      parseTime(timePeriods.lunchTime.start),
      parseTime(timePeriods.lunchTime.end),
    )
  ) {
    return 'lunch-time'
  } else if (
    isTimeBetween(
      timeObj,
      parseTime(timePeriods.evening.start),
      parseTime(timePeriods.evening.end),
    )
  ) {
    return 'evening'
  }

  return ''
}

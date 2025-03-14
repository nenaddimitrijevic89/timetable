import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'

dayjs.extend(isToday)
dayjs.extend(isTomorrow)

export const getIsToday = (date: string): boolean => {
  return dayjs(date).isToday()
}

export const getDayLabel = (date: string): string => {
  const dayjsDate = dayjs(date)
  if (dayjsDate.isToday()) return 'Today'
  if (dayjsDate.isTomorrow()) return 'Tomorrow'

  return dayjsDate.format('dddd')
}

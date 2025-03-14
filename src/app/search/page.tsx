import { getCategories } from '@/@@/api/categories'
import { getClasses } from '@/@@/api/classes'
import { getGyms } from '@/@@/api/gyms'
import { getTimetables } from '@/@@/api/timetable'
import { timetableMapper } from '@/@@/services/timetableMapper'
import { Timetable } from '@/@@/components/search-page/Timetable'

export default async function SearchPage() {
  const classes = await getClasses()
  const gyms = await getGyms()
  const categories = await getCategories()
  const timetable = await getTimetables()

  const timetableMap = timetableMapper(timetable?.data)

  return (
    <Timetable
      classes={classes.data}
      gyms={gyms.data}
      categories={categories.data}
      timetableMap={timetableMap}
    />
  )
}

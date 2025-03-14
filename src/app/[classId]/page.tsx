import { TClass } from '@/@@/types'
import { BookClass } from '@/@@/components/class/BookClass'
import { getClassBySlug } from '@/@@/api/classes'

export default async function ClassPage({
  params,
}: {
  params: Promise<{ classId: string }>
}) {
  const { classId } = await params
  const { data } = await getClassBySlug(classId)

  const classItem: TClass = data[0]
  const timetables = classItem.timetables
  const locations = [...new Set(timetables.map((timetable) => timetable.gym))]

  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
      <div className='flex flex-col gap-8 lg:gap-12'>
        <h1 className='text-center text-3xl font-extrabold uppercase text-white'>
          {classItem.title}
        </h1>
        <div className='flex gap-10 border-y border-[#2D2D2D] py-3'>
          <div className='font-medium text-[#BDBDBD]'>Locations:</div>
          <div className='flex flex-col gap-1'>
            {locations.map((location, i) => (
              <div key={`${location}-${i}`} className='font-medium text-white'>
                {location}
              </div>
            ))}
          </div>
        </div>
        <BookClass classItem={classItem} />
      </div>
      <div
        className='fixed right-0 top-0 hidden h-full w-[50%] bg-cover bg-center lg:block'
        style={{ backgroundImage: `url(${classItem.featuredImage.url})` }}
      />
      <div
        className='block h-full min-h-[800px] w-full bg-cover bg-center lg:hidden'
        style={{ backgroundImage: `url(${classItem.featuredImage.url})` }}
      />
    </div>
  )
}

export type TCategory = {
  id: number
  title: string
  slug: ECategory
  classes: TClass[]
}

export type TClass = {
  id: number
  title: string
  slug: string
  excerpt: string
  categories: TCategory[]
  timetables: TTimetable[]
  featuredImage: {
    url: string
  }
}

export type TTimetable = {
  id: number
  name: string
  description: string
  instructor: string
  date: string
  time: string
  duration: string
  location: string
  gym: string
  dayOfWeek: number
  capacity: number
  categories: TCategory[]
  class: TClass
}

export type TTimetableMap = Record<string, TTimetable[]>

export type TOption = {
  label: string
  value: string
  disabled?: boolean
}

export type TGym = {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  legendId: string
  details: string
  markerLeft: number
  markerTop: number
  slug: string
}

export enum ECategory {
  AERIAL = 'aerial',
  FIGHT = 'fight',
  RIDE = 'ride',
  STRENGTH = 'strength',
  HOLISTIC = 'holistic',
  RHYTHM = 'rhythm',
  SWEAT = 'sweat',
  SKILL = 'skill',
  MIND = 'mind',
}

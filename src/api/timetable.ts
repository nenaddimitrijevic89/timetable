import { STRAPI_API } from './config'

export const getTimetables = async () => {
  const response = await STRAPI_API.get(
    '/timetables?pagination[limit]=-1&populate=*&sort=date:asc&sort=time:asc',
  )

  return response.data
}

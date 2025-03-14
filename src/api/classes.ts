import { STRAPI_API } from './config'

export const getClasses = async () => {
  const response = await STRAPI_API.get(
    '/classes?pagination[limit]=-1&populate=*&sort=title:asc',
  )

  return response.data
}

export const getClassBySlug = async (slug: string) => {
  const response = await STRAPI_API.get(
    `/classes?filters[slug][$eq]=${slug}&populate=*`,
  )

  return response.data
}

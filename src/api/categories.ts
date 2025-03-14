import { STRAPI_API } from './config'

export const getCategories = async () => {
  const response = await STRAPI_API.get('/categories?populate=*')

  return response.data
}

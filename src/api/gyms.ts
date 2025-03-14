import { STRAPI_API } from './config'

export const getGyms = async () => {
  const response = await STRAPI_API.get('/gyms')

  return response.data
}

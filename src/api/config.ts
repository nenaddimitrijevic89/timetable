import axios from 'axios'

export const STRAPI_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  timeout: 30000,
  headers: {},
})

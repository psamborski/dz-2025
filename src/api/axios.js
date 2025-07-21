import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import {CONFIG} from '/src/utils/config'

export function createAxiosInstance({
                                      formData = false,
                                      authorization = `Bearer ${CONFIG.CONTENTFUL_CONSUME_API_KEY || import.meta.env.VITE_CONTENTFUL_CONSUME_API_KEY}`,
                                      baseUrl = `https://graphql.contentful.com/content/v1/spaces/${CONFIG.CONTENTFUL_SPACE_ID}/`
                                    } = {}) {
  const instance = axios.create({
    baseURL: baseUrl,
  })

  console.log(CONFIG.CONTENTFUL_CONSUME_API_KEY)
  console.log(import.meta.env)
  console.log(CONFIG.CONTENTFUL_CONSUME_API_KEY || import.meta.env.VITE_CONTENTFUL_CONSUME_API_KEY)

  instance.defaults.headers.common['Authorization'] = authorization

  if (formData) {
    instance.defaults.headers.common['Content-Type'] = 'multipart/form-data'
  }

  instance.interceptors.request.use((request) => {
    // console.log('Axios request:')
    // console.dir(request)
    // console.trace()
    return request
  })

  instance.interceptors.response.use(
    (response) => camelcaseKeys(response, {deep: true}),
    (error) => {
      // console.log('Axios error:')
      // console.dir(error)
      return Promise.reject(error?.response?.data || 'Something went wrong')
    }
  )

  return instance
}
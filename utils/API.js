import axios from 'axios'

const API = axios.create()

API.defaults.baseURL =
  process.env.VUE_APP_API_URL || 'http://localhost:3000'

API.defaults.withCredentials = true

API.interceptors.request.use((config) => {
  let token = ''
  if (process.client) {
    token = window.localStorage.getItem('token')
  }
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
})

API.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default API

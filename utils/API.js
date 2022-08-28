import axios from 'axios'

const API = axios.create()

API.defaults.baseURL =
  process.env.VUE_APP_API_URL || 'https://pullog-api.herokuapp.com'

API.defaults.withCredentials = true

API.interceptors.request.use((config) => {
  let token = ''
  if (process.client) {
    token = localStorage.getItem('token')
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

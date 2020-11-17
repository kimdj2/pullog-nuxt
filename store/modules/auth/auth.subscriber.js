import { store } from '@/store'

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'authModule/LOGIN_SUCCESS':
      window.localStorage.setItem('token', mutation.payload)
      break
    case 'authModule/CLEAR_AUTH':
      window.localStorage.removeItem('token')
      break
    default:
      break
  }
})

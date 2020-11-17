import API from '@/utils/API'

import * as types from '@/store/modules/auth/auth.types'

export default {
  async login({ commit, dispatch }, formData) {
    commit(types.LOGIN_PENDING)
    try {
      const res = await API.post('app/auth_user', formData)
      const token = res.data.auth_token
      window.localStorage.setItem('token', token)
      commit(types.LOGIN_SUCCESS, token)
      this.app.router.push('/admin')
    } catch (error) {
      commit(types.LOGIN_FAIL)
      dispatch('clearAuth')
    }
  },
  async loadUser({ commit, dispatch }) {
    commit(types.LOAD_USER_PENDING)
    const token = window.localStorage.getItem('token')
    if (!token) {
      commit(types.LOAD_USER_FAIL)
      return null
    }
    try {
      const res = await API.get('app/get_auth')
      const userData = res.data
      commit(types.LOAD_USER_SUCCESS, userData)
    } catch (error) {
      commit(types.LOAD_USER_FAIL)
      dispatch('clearAuth')
    }
  },
  clearAuth({ commit }) {
    commit(types.CLEAR_AUTH)
    this.app.router.push('/admin/login')
  },
}

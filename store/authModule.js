import authGetters from '@/store/modules/auth/auth.getters'
import authMutations from '@/store/modules/auth/auth.mutations'
import authActions from '@/store/modules/auth/auth.actions'

export const state = () => {
  return {
    userData: null,
    loginLoading: false,
  }
}
export const getters = authGetters
export const mutations = authMutations
export const actions = authActions

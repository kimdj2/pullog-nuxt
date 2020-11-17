import Vue from 'vue'
import Vuex from 'vuex'
import authModule from '@/store/modules/auth'
import postModule from '@/store/modules/post'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    authModule,
    postModule,
  },
})

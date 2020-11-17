import getters from '@/store/modules/post/post.getters'
import mutations from '@/store/modules/post/post.mutations'
import actions from '@/store/modules/post/post.actions'

const state = () => {
  return {
    posts: [],
    pageInfo: null,
    post: null,
    beforePost: null,
    nextPost: null,
    postLoading: false,
    clearPostsFlg: false,
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

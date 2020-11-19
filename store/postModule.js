import postGetters from '@/store/modules/post/post.getters'
import postMutations from '@/store/modules/post/post.mutations'
import postActions from '@/store/modules/post/post.actions'

export const state = () => {
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
export const getters = postGetters
export const mutations = postMutations
export const actions = postActions

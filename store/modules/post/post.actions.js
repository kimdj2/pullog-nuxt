import API from '@/utils/API'
import * as types from '@/store/modules/post/post.types'

export default {
  async getPostList({ commit }, { page, pageParams }) {
    commit(types.GET_POSTS_LIST_PENDING)
    let params = {}
    if (pageParams) {
      params = pageParams
    }
    if (!page) {
      params.page = 0
    } else {
      params.page = page
    }
    try {
      const {
        data: { pageInfo, posts },
      } = await API.get('/app/boards', {
        params,
      })
      commit(types.GET_POSTS_LIST_SUCCESS, {
        posts,
        pageInfo,
      })
    } catch (error) {
      commit(types.GET_POSTS_LIST_FAIL)
    }
  },
  async getPost({ commit }, { postId }) {
    if (!postId) {
      commit(types.GET_POST_FAIL)
      return
    }
    commit(types.GET_POST_PENDING)
    try {
      const {
        data: { post, beforePost, nextPost, relatedPosts },
      } = await API.get(`/app/boards/${postId}`)
      commit(types.GET_POST_SUCCESS, {
        post,
        beforePost,
        nextPost,
        relatedPosts,
      })
    } catch (error) {
      commit(types.GET_POST_FAIL)
    }
  },
  async savePost({ commit }, { params }) {
    commit(types.SAVE_POST_PENDING)
    try {
      await API.post('/app/boards', params, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      commit(types.SAVE_POST_SUCCESS)
    } catch (error) {
      commit(types.SAVE_POST_FAIL)
    }
  },
  async updatePost({ commit }, { postId, params }) {
    if (!postId) {
      commit(types.UPDATE_POST_FAIL)
      return
    }
    commit(types.UPDATE_POST_PENDING)
    try {
      await API.patch(`/app/boards/${postId}`, params, {
        'Content-Type': 'multipart/form-data',
      })
      commit(types.UPDATE_POST_SUCCESS)
    } catch (error) {
      commit(types.UPDATE_POST_FAIL)
    }
  },
  async deletePost({ commit }, { postId }) {
    if (!postId) {
      commit(types.DELETE_POST_FAIL)
      return
    }
    commit(types.DELETE_POST_PENDING)
    try {
      await API.delete(`/app/boards/${postId}`)
      commit(types.DELETE_POST_SUCCESS)
    } catch (error) {
      commit(types.DELETE_POST_FAIL)
    }
  },
  clearPosts({ commit }) {
    commit(types.CLEAR_POSTS)
  },
  requestClearPosts({ commit }) {
    commit(types.REQUEST_CLEAR_POSTS)
  },
}

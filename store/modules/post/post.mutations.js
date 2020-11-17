import * as types from '@/store/modules/post/post.types'

export default {
  // Get All Posts
  [types.GET_POSTS_LIST_PENDING]: (state) => {
    state.postLoading = true
    state.pageInfo = null
  },
  [types.GET_POSTS_LIST_SUCCESS]: (state, { posts, pageInfo }) => {
    state.postLoading = false
    state.posts.push(...posts)
    state.pageInfo = pageInfo
  },
  [types.GET_POSTS_LIST_FAIL]: (state) => {
    state.postLoading = false
    state.posts = []
  },

  // Get Post
  [types.GET_POST_PENDING]: (state) => {
    state.postLoading = true
    state.post = null
    state.pageInfo = null
    state.nextPost = []
    state.beforePost = []
    state.relatedPosts = []
    state.posts = []
  },
  [types.GET_POST_SUCCESS]: (
    state,
    { post, beforePost, nextPost, relatedPosts }
  ) => {
    state.postLoading = false
    state.post = post
    state.beforePost = beforePost
    state.nextPost = nextPost
    state.pageInfo = null
    state.relatedPosts = relatedPosts
    state.posts = []
  },
  [types.GET_POST_FAIL]: (state) => {
    state.postLoading = false
    state.post = null
    state.pageInfo = null
    state.nextPost = []
    state.beforePost = []
    state.relatedPosts = []
    state.posts = []
  },

  // Save Post
  [types.SAVE_POST_PENDING]: (state) => {
    state.postLoading = true
  },
  [types.SAVE_POST_SUCCESS]: (state) => {
    state.postLoading = false
  },
  [types.SAVE_POST_FAIL]: (state) => {
    state.postLoading = false
  },

  // Update Post
  [types.UPDATE_POST_PENDING]: (state) => {
    state.postLoading = true
  },
  [types.UPDATE_POST_SUCCESS]: (state) => {
    state.postLoading = false
  },
  [types.UPDATE_POST_FAIL]: (state) => {
    state.postLoading = false
  },

  // Delete Post
  [types.DELETE_POST_PENDING]: (state) => {
    state.postLoading = true
  },
  [types.DELETE_POST_SUCCESS]: (state) => {
    state.postLoading = false
  },
  [types.DELETE_POST_FAIL]: (state) => {
    state.postLoading = false
  },

  [types.CLEAR_POSTS]: (state) => {
    state.posts = []
    state.pageInfo = null
    state.clearPostsFlg = false
  },
  [types.REQUEST_CLEAR_POSTS]: (state) => {
    state.clearPostsFlg = true
  },
}

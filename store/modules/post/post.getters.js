export default {
  getFormData: (state) => {
    const post = state.post
    const customPost = (paramPost) => {
      if (paramPost) {
        return {
          title: paramPost.title,
          description: paramPost.description,
          image_path: paramPost.image_path,
          image: null,
          tagList: paramPost.tag_list,
          contents: paramPost.contents,
          contentsHtml: paramPost.contents_html,
        }
      }
      return null
    }
    return customPost(post)
  },
}

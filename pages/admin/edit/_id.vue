<template>
  <v-card class="elevation-1 pa-3">
    <v-card-title> ポスト編集 </v-card-title>
    <v-card-text>
      <PostForm
        v-if="!loading"
        :init-form-data="formData"
        @changeFormData="changeFormData"
      />
    </v-card-text>
    <v-col class="text-right">
      <v-btn tile color="success" @click="submitUpdate">
        <v-icon left> mdi-pencil </v-icon>
        更新
      </v-btn>
    </v-col>
  </v-card>
</template>
<script>
import PostForm from '@/components/post/PostForm'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  layout: 'admin',
  components: {
    PostForm,
  },
  data() {
    return {
      loading: true,
      formData: {},
    }
  },
  async created() {
    await this.getPost({ postId: this.postId })
    this.formData = this.getFormData
    this.loading = false
  },
  computed: {
    ...mapState('postModule', ['post']),
    ...mapGetters('postModule', ['getFormData']),
    postId() {
      return this.$route.params.postId
    },
  },
  methods: {
    ...mapActions('postModule', ['getPost', 'updatePost', 'clearPosts']),
    changeFormData(formData) {
      this.formData = formData
    },
    submitUpdate() {
      const formData = this.createFormData(this.formData)
      this.updatePost({ postId: this.postId, params: formData })
      this.clearPosts()
      this.$router.push({ name: 'admin-post-list' })
    },
    createFormData(data) {
      const formData = new FormData()
      for (const key in data) {
        if (data[key]) {
          formData.append(`board[${key}]`, data[key])
        }
      }
      return formData
    },
  },
}
</script>

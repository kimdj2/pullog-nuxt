<template>
  <div>
    <v-container grid-list-xs>
      <v-row dense transition-duration="0s">
        <v-col v-for="post in posts" :key="post.id" cols="4">
          <v-lazy
            :options="{
              threshold: 0.6,
            }"
            min-height="200"
            transition="fade-transition"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-img
                  v-if="post.image_path"
                  :src="post.image_path"
                  class="white--text align-center justify-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200"
                >
                </v-img>
                <v-img
                  v-else
                  :src="require('@/assets/no_image.png')"
                  class="align-center justify-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200"
                >
                  <v-card-subtitle
                    class="black--text text-center font-weight-bold text-h6"
                    v-text="post.title"
                  ></v-card-subtitle>
                </v-img>
                <v-card-subtitle class="pb-0">
                  {{ callGetParseDate(post.created_at) }}
                </v-card-subtitle>
                <v-card-title class="pt-0 font-weight-black">
                  {{ cutTitleLength(post.title) }}
                </v-card-title>
                <v-divider class="mx-4 pb-2"></v-divider>
                <v-card-text>
                  <span v-for="tag in post.tag_list" :key="tag">
                    <v-chip
                      class="ma-2"
                      color="pink"
                      label
                      small
                      text-color="white"
                    >
                      <v-icon left> mdi-tag </v-icon>
                      {{ tag }}
                    </v-chip>
                  </span>
                </v-card-text>
                <v-card-actions>
                  <v-col class="text-right">
                    <v-btn
                      tile
                      color="cyan lighten-3 mx-2"
                      @click="moveModify(post.id)"
                    >
                      <v-icon left> mdi-pencil </v-icon>
                      修正
                    </v-btn>
                    <v-btn
                      tile
                      color="red darken-3 mx-2"
                      @click="submitDelete(post.id)"
                    >
                      <v-icon left> mdi-delete </v-icon>
                      削除
                    </v-btn>
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-lazy>
        </v-col>
      </v-row>
    </v-container>
    <infinite-loading :distance="1" @infinite="infiniteHandler">
      <span slot="spinner"><PageLoading /></span>
      <span slot="no-more"></span>
      <span slot="no-results"></span>
    </infinite-loading>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getParseDate } from '@/utils/time'
import PageLoading from '@/components/post/PostLoading.vue'

export default {
  name: 'PostSearchList',
  layout: 'admin',
  components: {
    PageLoading,
  },
  computed: {
    ...mapState('postModule', ['posts', 'pageInfo', 'clearPostsFlg']),
    tagId() {
      return this.$route.params.tagId
    },
    month() {
      return this.$route.params.month
    },
    search() {
      return this.$route.params.search
    },
  },
  methods: {
    ...mapActions('postModule', ['getPostList', 'clearPosts', 'deletePost']),
    async infiniteHandler($state) {
      // 現在ページと全体ページ数が一致（最後のロードまで）する場合はロードしない
      if (this.pageInfo && this.pageInfo.current >= this.pageInfo.pages) {
        $state.complete()
        return
      }
      await this.retrivePostList($state)
      $state.loaded()
    },
    async retrivePostList() {
      let page = 0
      if (this.pageInfo) {
        page = this.pageInfo.current
      }
      await this.getPostList({
        page: page + 1,
        pageParams: this.settingParams(),
      })
    },
    callGetParseDate(dateString) {
      return getParseDate(dateString)
    },
    settingParams() {
      const params = {}
      if (this.tag) {
        params.tag = this.tag
      }
      if (this.month) {
        params.month = this.month
      }
      if (this.search) {
        params.search = this.search
      }
      return params
    },
    moveModify(postId) {
      this.$router.push(`/admin/edit/${postId}`)
    },
    submitDelete(postId) {
      this.deletePost({ postId })
      this.clearPosts()
      this.retrivePostList()
    },
    cutTitleLength(title) {
      if (title.length > 25) {
        title = title.substr(0, 25) + '...'
      }
      return title
    },
  },
  beforeMount() {
    if (this.clearPostsFlg) {
      this.clearPosts()
    }
  },
}
</script>

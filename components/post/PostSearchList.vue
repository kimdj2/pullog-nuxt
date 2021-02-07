<template>
  <div>
    <v-row v-masonry dense transition-duration="0s">
      <v-col v-if="isMobile" cols="12">
        <SearchForm v-if="isMobile" />
      </v-col>
      <v-col
        v-for="post in posts"
        :key="post.id"
        v-masonry-tile
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <v-lazy
          :options="{
            threshold: 0.6,
          }"
          min-height="200"
          transition="fade-transition"
          class="cursor-pointer"
        >
          <v-hover v-slot="{ hover }">
            <router-link tag="div" :to="`/post/${post.id}`">
              <v-card
                :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-img
                  v-if="post.image_path"
                  :src="post.image_path"
                  class="white--text align-center justify-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  :min-height="minHeight"
                  :max-height="maxHeight"
                  @load="masonryLoad"
                >
                </v-img>
                <v-img
                  v-else
                  :src="require('@/assets/no_image.png')"
                  class="align-center justify-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  :min-height="minHeight"
                  :max-height="maxHeight"
                  @load="masonryLoad"
                >
                  <v-card-subtitle
                    class="black--text text-center font-weight-bold text-h6"
                    v-text="post.title"
                  ></v-card-subtitle>
                </v-img>
                <v-card-subtitle class="pb-0">
                  {{ callGetParseDate(post.created_at) }}
                </v-card-subtitle>
                <v-card-title
                  id="post-list-title"
                  class="pt-0 font-weight-black"
                >
                  {{ cutTitleLength(post.title) }}
                </v-card-title>
                <v-divider class="mx-4 pb-2"></v-divider>
                <v-card-text>
                  <span v-for="tag in post.tag_list" :key="tag">
                    <v-chip
                      class="ma-1"
                      color="indigo lighten-3"
                      label
                      small
                      text-color="white"
                      @click.stop.prevent="searchTag(tag)"
                    >
                      <v-icon left> mdi-tag </v-icon>
                      {{ tag }}
                    </v-chip>
                  </span>
                </v-card-text>
              </v-card>
            </router-link>
          </v-hover>
        </v-lazy>
      </v-col>
    </v-row>
    <infinite-loading :distance="500" @infinite="infiniteHandler">
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
import SearchForm from '@/components/form/SearchForm.vue'

export default {
  name: 'PostSearchList',
  components: {
    PageLoading,
    SearchForm,
  },
  beforeMount() {
    if (this.clearPostsFlg) {
      this.clearPosts()
    }
  },
  computed: {
    ...mapState('postModule', ['posts', 'pageInfo', 'clearPostsFlg']),
    tagName() {
      return this.$route.params.tagName
    },
    month() {
      return this.$route.params.month
    },
    search() {
      return this.$route.params.search
    },
    minHeight() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 200
      }
      return 150
    },
    maxHeight() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 200
      }
      return null
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  mounted() {
    if (process.browser) {
      this.masonryLoad()
    }
  },
  methods: {
    ...mapActions('postModule', [
      'getPostList',
      'clearPosts',
      'requestClearPosts',
    ]),
    masonryLoad() {
      setTimeout(() => {
        this.$redrawVueMasonry()
      }, 100)
    },
    async infiniteHandler($state) {
      // 現在ページと全体ページ数が一致（最後のロードまで）する場合はロードしない
      if (this.pageInfo && this.pageInfo.current >= this.pageInfo.pages) {
        $state.complete()
        return
      }
      await this.retrivePostList($state)
      if (process.browser) {
        this.masonryLoad()
      }
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
      if (this.tagName) {
        params.tag = this.tagName
      }
      if (this.month) {
        params.month = this.month
      }
      if (this.search) {
        params.search = this.search
      }
      return params
    },
    searchTag(tagName) {
      this.requestClearPosts()
      this.$router.push(`/tag/${tagName}`)
    },
    cutTitleLength(title) {
      if (title.length > 60) {
        title = title.substr(0, 60) + '...'
      }
      return title
    },
  },
}
</script>
<style lang="scss">
#post-list-title {
  font-size: 1.1rem;
}
.cursor-pointer {
  cursor: pointer;
}
</style>

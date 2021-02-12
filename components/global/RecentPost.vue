<template>
  <v-sheet elevation="0" outlined>
    <v-skeleton-loader
      v-if="loading"
      type="article, list-item-three-line, list-item-three-line"
    ></v-skeleton-loader>
    <v-card v-else color="transparent" outlined>
      <v-subheader>
        <v-icon>mdi-history</v-icon>
        Recent Posts
      </v-subheader>
      <v-card-text class="pa-0">
        <v-col
          v-for="post in recentPosts"
          :key="post.id"
          cols="12"
          class="pa-0 py-2"
        >
          <v-card class="mx-2 pa-0" outlined @click="movePage(post.id)">
            <v-img
              v-if="post.image_path"
              :src="post.image_path"
              class="white--text align-center justify-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="100"
            >
            </v-img>
            <v-img
              v-else
              :src="require('@/assets/no_image.png')"
              class="align-center justify-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="100"
            >
              <v-card-subtitle
                class="black--text text-center"
                v-text="post.title"
              ></v-card-subtitle>
            </v-img>
            <v-card-subtitle
              id="resent-post-title"
              height="50"
              class="font-weight-bold"
            >
              <span>{{ post.title }}</span>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import API from '@/utils/API'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      recentPosts: [],
    }
  },
  created() {
    this.retrieveRecentPosts()
  },
  methods: {
    ...mapActions('postModule', ['requestClearPosts']),
    async retrieveRecentPosts() {
      this.loading = true
      const res = await API.get('/app/recent_posts')
      this.recentPosts = res.data
      this.loading = false
    },
    movePage(postId) {
      this.$router.push(`/post/${postId}`)
    },
  },
}
</script>
<style lang="scss">
#resent-post-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

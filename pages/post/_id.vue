<template>
  <div>
    <v-skeleton-loader
      v-if="postLoading"
      type="article, image, image, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
    ></v-skeleton-loader>
    <v-card v-else color="white" elevation="2" rounded="lg" min-height="70vh">
      <post-move
        :before-post="beforePost"
        :next-post="nextPost"
        @movePage="movePage"
      />
      <v-card-title class="pt-2 font-weight-black">
        <h1 id="post-title" class="text-h5 font-weight-black">
          {{ post.title }}
        </h1>
      </v-card-title>
      <v-card-subtitle class="font-weight-black mx-2">
        {{ callGetParseDate(post.created_at) }}
      </v-card-subtitle>
      <v-card-text class="pb-2">
        <span v-for="tag in post.tag_list" :key="tag">
          <v-chip
            class="ma-1"
            color="indigo lighten-3"
            label
            small
            text-color="white"
            @click="searchTag(tag)"
          >
            <v-icon left> mdi-tag </v-icon>
            {{ tag }}
          </v-chip>
        </span>
      </v-card-text>
      <v-divider class="mx-4 mb-4"></v-divider>
      <v-img
        v-if="post.image_path"
        :src="post.image_path"
        class="mx-12 align-center justify-center"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
      </v-img>
      <v-card-subtitle class="font-weight-black text-md-h7">
        {{ post.description }}
      </v-card-subtitle>
      <v-card-text>
        <viewer :initial-value="post.contents" :options="editorOptions" />
      </v-card-text>
      <Disqus class="ma-4" />
      <br />
      <div class="font-weight-bold mx-4 my-2">Related Posts</div>
      <v-divider class="ma-4"></v-divider>
      <v-row>
        <v-col
          v-if="relatedPosts.length === 0"
          class="text-center align-center justify-center my-10 font-weight-bold"
        >
          関連のポストが存在しません。
        </v-col>
        <v-col
          v-for="relatedPost in relatedPosts"
          v-else
          :key="relatedPost.id"
          cols="12"
          md="4"
        >
          <v-card class="mx-2" @click="movePage(relatedPost.id)">
            <v-img
              v-if="relatedPost.image_path"
              :src="relatedPost.image_path"
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
                v-text="relatedPost.title"
              ></v-card-subtitle>
            </v-img>
            <v-card-subtitle
              id="resent-post-title"
              height="50"
              class="font-weight-bold"
            >
              <span>{{ relatedPost.title }}</span>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="ma-4 py-3"></v-divider>
      <post-move
        :before-post="beforePost"
        :next-post="nextPost"
        @movePage="movePage"
      />
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getParseDate } from '@/utils/time'
import PostMove from '@/components/post/PostMove'
import { Disqus } from 'vue-disqus'

import 'highlight.js/styles/dracula.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'

export default {
  components: {
    PostMove,
    Disqus,
  },
  data() {
    return {
      editorOptions: {
        plugins: [[codeSyntaxHighlight, { hljs }]],
      },
    }
  },
  computed: {
    ...mapState('postModule', [
      'post',
      'beforePost',
      'nextPost',
      'relatedPosts',
      'postLoading',
    ]),
    postId() {
      return this.$route.params.id
    },
  },
  async created() {
    await this.getPost({ postId: this.postId })
  },
  methods: {
    ...mapActions('postModule', {
      getPost: 'getPost',
      requestClearPosts: 'requestClearPosts',
    }),
    callGetParseDate(dateString) {
      return getParseDate(dateString)
    },
    movePage(postId) {
      this.$router.push(`/post/${postId}`)
      this.getPost({ postId })
    },
    searchTag(tagName) {
      this.requestClearPosts()
      this.$router.push(`/tag/${tagName}`)
    },
  },
  head() {
    const post = this.post
    return {
      titleTemplate: '%s | Pullog',
      title: post ? post.title : 'Engineer Blog',
      htmlAttrs: {
        lang: 'ja-JP',
        dir: 'ltr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: post ? post.contents : 'Pullog Engineer Blog',
          vmid: 'description',
        },
        {
          name: 'keywords',
          content: post
            ? post.tag_list.join()
            : 'java, python, rails, ruby, nginx, aws, vue, javascript',
        },
        { name: 'author', content: 'inoshishi' },
        {
          property: 'og:title',
          content: post ? post.title : 'Engineer Blog',
          template: (chunk) => `${chunk} | Pullog`,
          vmid: 'og:title',
        },
        {
          property: 'og:url',
          content: 'https://www.pullog.tokyo',
          vmid: 'og:url',
        },
        {
          property: 'og:image',
          content: post && post.image_path ? post.image_path : 'Engineer Blog',
          vmid: 'og:image',
        },
        {
          property: 'og:description',
          content:
            post && post.description
              ? post.description
              : 'Pullog Engineer Blog',
          vmid: 'og:description',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  async beforeRouterEnter(to, from, next) {
    await this.getPost({ postId: this.postId })
    next()
  },
}
</script>
<style lang="scss">
#post-title {
  font-family: 'M Plus 1p' !important;
}
#related-post-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

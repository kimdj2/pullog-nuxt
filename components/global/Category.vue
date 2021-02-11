<template>
  <v-sheet elevation="0" outlined>
    <v-skeleton-loader
      v-if="loading"
      type="article, list-item-three-line, list-item-three-line"
    ></v-skeleton-loader>
    <v-card v-else color="transparent">
      <v-subheader>
        <v-icon>mdi-tag-multiple</v-icon>
        Tags
      </v-subheader>
      <v-card-text>
        <span v-for="tag in tagList" :key="tag.id">
          <v-hover v-slot="{ hover }">
            <v-chip
              class="ma-1"
              color="indigo lighten-3"
              label
              small
              text-color="white"
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              @click="searchTag(tag.name)"
            >
              {{ tag.name }}({{ tag.taggings_count }})
            </v-chip>
          </v-hover>
        </span>
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
      tagList: [],
    }
  },
  created() {
    this.retrieveTagList()
  },
  methods: {
    ...mapActions('postModule', ['requestClearPosts']),
    async retrieveTagList() {
      this.loading = true
      const res = await API.get('/app/taglist')
      this.tagList = res.data
      this.loading = false
    },
    searchTag(tagName) {
      this.requestClearPosts()
      this.$router.push(`/tag/${tagName}`)
    },
  },
}
</script>

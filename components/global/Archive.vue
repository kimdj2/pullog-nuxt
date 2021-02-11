<template>
  <v-sheet elevation="0">
    <v-skeleton-loader
      v-if="loading"
      type="article, list-item-three-line, list-item-three-line"
    ></v-skeleton-loader>
    <v-list v-else color="transparent">
      <v-subheader color="teal lighten-4">
        <v-icon>mdi-calendar-month</v-icon>
        Archive
      </v-subheader>
      <v-list-item
        v-for="archive in this.archives"
        :key="archive.id"
        link
        color="teal lighten-4"
      >
        <v-list-item-content @click="movePage(archive.month)">
          <v-list-item-subtitle>
            {{ callGetParseMonth(archive.month) }}
            ({{ archive.total_month }})
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import { mapActions } from 'vuex'
import API from '@/utils/API'
import { getParseMonth } from '@/utils/time'

export default {
  data() {
    return {
      loading: false,
      archives: [],
    }
  },
  created() {
    this.retrieveArchiveList()
  },
  methods: {
    ...mapActions('postModule', ['requestClearPosts']),
    async retrieveArchiveList() {
      this.loading = true
      const res = await API.get('/app/archive')
      this.archives = res.data
      this.loading = false
    },
    callGetParseMonth(dateString) {
      return getParseMonth(dateString)
    },
    movePage(month) {
      this.requestClearPosts()
      this.$router.push(`/month/${this.callGetParseMonth(month)}`)
    },
  },
}
</script>

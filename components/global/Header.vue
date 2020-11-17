<template>
  <div>
    <v-app-bar app color="white">
      <v-container class="py-0 fill-height">
        <v-img
          :src="require('@/assets/logo.png')"
          max-height="50"
          max-width="100"
          contain
          @click="moveHome"
        ></v-img>
        <v-spacer></v-spacer>
        <SearchForm v-if="!isMobile" />
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SearchForm from '@/components/form/SearchForm'

export default {
  name: 'Header',
  components: {
    SearchForm,
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    ...mapActions('postModule', ['requestClearPosts']),
    moveHome() {
      this.requestClearPosts()
      this.$router.push('/')
    },
  },
}
</script>

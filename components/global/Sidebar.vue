<template>
  <v-col cols="12" sm="12" md="3">
    <div ref="sidebarContent" class="sidebar-content" :class="sidebarStyles">
      <Profile />
      <br />
      <Category />
      <br />
      <Archive />
      <br />
      <RecentPost />
    </div>
  </v-col>
</template>

<script>
import Category from '@/components/global/Category'
import Archive from '@/components/global/Archive'
import RecentPost from '@/components/global/RecentPost'
import Profile from '@/components/global/Profile'
import _ from 'lodash'

export default {
  data() {
    return {
      sidebar: {
        height: 0,
        windowHeight: 0,
        windowScrollTop: 0,
      },
    }
  },
  computed: {
    sidebarStyles() {
      if (this.sidebar.height <= this.sidebar.windowHeight) {
        return { 'fixed-top': true }
      }
      if (
        this.sidebar.windowScrollTop + this.sidebar.windowHeight >
        this.sidebar.height
      ) {
        return { 'fixed-bottom': true }
      }
      return {}
    },
  },
  // created() {
  //   window.addEventListener('resize', this.handleResize)
  //   window.addEventListener('scroll', this.hendleScroll)
  // },
  mounted() {
    this.calculateSidebar()
  },
  methods: {
    handleResize: _.throttle(function () {
      this.calculateSidebar()
    }, 100),
    hendleScroll: _.throttle(function () {
      if (process.client) {
        this.sidebar.windowScrollTop =
          window.pageYOffset || document.documentElement.scrollTop
      }
    }, 100),
    calculateSidebar() {
      if (process.client) {
        this.sidebar.height = this.$refs.sidebarContent.offsetHeight
        this.sidebar.windowHeight = window.innerHeight
      }
    },
  },
  components: {
    Category,
    Archive,
    RecentPost,
    Profile,
  },
}
</script>
<style lang="scss" scoped>
.sidebar-content {
  &.fixed-top {
    position: sticky;
  }
  &.fixed-bottom {
    position: sticky;
  }
}
</style>

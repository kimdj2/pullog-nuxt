<template>
  <v-app class="post-main">
    <Header />
    <v-main class="blue-grey lighten-5">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="9">
            <Nuxt />
          </v-col>
          <Sidebar />
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<!-- script -->
<script>
import Header from '@/components/global/Header.vue'
import Sidebar from '@/components/global/Sidebar.vue'
import Footer from '@/components/global/Footer.vue'

export default {
  name: 'PostIndex',
  components: {
    Header,
    Sidebar,
    Footer,
  },
}
</script>

<style lang="scss">
.bg {
  background-size: cover;
  background-image: url('~@/assets/no_image.png');
}
.post-main {
  @media (min-width: 1904px) {
    .container {
      max-width: 1185px;
    }
  }
}
@font-face {
  font-family: 'M Plus 1p';
  src: url('~@/assets/fonts/MPLUS1p-Black.ttf') format('truetype'),
    url('~@/assets/fonts/MPLUS1p-Bold.ttf') format('truetype'),
    url('~@/assets/fonts/MPLUS1p-ExtraBold.ttf') format('truetype'),
    url('~@/assets/fonts/MPLUS1p-Light.ttf') format('truetype'),
    url('~@/assets/fonts/MPLUS1p-Medium.ttf') format('truetype'),
    url('~@/assets/fonts/MPLUS1p-Regular.ttf') format('truetype'),
    url('~@/assets/fonts/MPLUS1p-Thin.ttf') format('truetype');
}
.v-application {
  font-family: 'M Plus 1p' !important;
  code {
    font-size: 110% !important;
    font-weight: 500 !important;
    background-color: transparent !important;
  }
}
.tui-editor-contents {
  font-family: 'M Plus 1p', 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial',
    '나눔바른고딕', 'Nanum Barun Gothic', '맑은고딕', 'Malgun Gothic',
    sans-serif !important;
  font-size: 14px;
  pre {
    background-color: #f8f8f8;
  }
}
</style>

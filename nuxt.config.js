import colors from 'vuetify/es5/util/colors'
import API from './utils/API'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s | Pullog',
    title: 'Engineer Blog',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'google-site-verification',
        content: 'Ak8YewlXc4KjrKKH6VRWRXCjvvwdqivNGyUkFlP0mh8',
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/infiniteloading', ssr: false },
    { src: '~/plugins/vue-masonry', ssr: false },
    { src: '~/plugins/vue-disqus', ssr: false },
    { src: '~/plugins/viewer', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.pullog.tokyo',
    // generate: true,
    exclude: ['/admin', '/admin/list', '/admin/newpost', '/admin/login'],
    routes(callback) {
      API.get('/app/boards')
        .then((res) => {
          let routes = res.data.posts.map((post) => {
            return '/posts/' + post.id
          })
          
          API.get('/app/taglist').then((res2) => {
            let tagRoutes = res2.data.map((tag) => {
              return '/tag/' + tag.name
            })
            routes = routes.concat(tagRoutes)
            routes = routes.push('/')
            callback(null, routes)
          })


        })
        .catch(callback)
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}

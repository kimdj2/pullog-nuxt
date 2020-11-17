<template>
  <v-app>
    <AdminSidebar />
    <v-main class="blue-grey lighten-5">
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<!-- script -->
<script>
import AdminSidebar from '@/components/global/AdminSidebar.vue'

export default {
  name: 'AdminIndex',
  middleware: 'auth_check',
  meta: {
    requiresAuth: true,
  },
  components: {
    AdminSidebar,
  },
}
</script>

<style lang="scss">
.bg {
  background-size: cover;
  background-image: url('~@/assets/no_image.png');
}
</style>

<template>
  <Nuxt />
</template>
<script>
export default {
  middleware: 'auth_check',
  meta: {
    checkLogined: true,
  },
}
</script>

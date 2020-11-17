export default ({ store, route, redirect }) => {
  if (route.meta.requiresAuth) {
    store.dispatch('authModule/loadUser').then(() => {
      if (!store.getters['authModule/isAuthenticated']) {
        return redirect('/admin/login')
      }
    })
  } else if (route.meta.checkLogined) {
    store.dispatch('authModule/loadUser').then(() => {
      if (store.getters['authModule/isAuthenticated']) {
        return redirect('/admin/home')
      }
    })
  }
}

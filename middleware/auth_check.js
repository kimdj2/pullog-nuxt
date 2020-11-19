export default ({ store, route, redirect }) => {
  if (route.meta[0].requiresAuth) {
    store.dispatch('authModule/loadUser').then(() => {
      if (!store.getters['authModule/isAuthenticated']) {
        return redirect('/admin/login')
      }
    })
  } else if (route.meta[0].checkLogined) {
    store.dispatch('authModule/loadUser').then(() => {
      if (store.getters['authModule/isAuthenticated']) {
        return redirect('/admin/home')
      }
    })
  }
}

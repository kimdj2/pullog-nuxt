export default {
  isAuthenticated(state) {
    return !!state.userData
  },
  userData: (state) => {
    if (state.userData) {
      return {
        username: state.userData.username,
        email: state.userData.email,
      }
    } else {
      return {
        username: '',
        email: '',
      }
    }
  },
}

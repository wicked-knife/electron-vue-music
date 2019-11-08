const state = {
  loginState: false
}

const getters = {
  loginState: state => state.loginState
}

const mutations = {
  setLoginState: (state, loginState) => state.loginState = loginState
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}

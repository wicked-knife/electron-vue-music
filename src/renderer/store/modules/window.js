const state = {
  maximized: false
}

const getters = {
  maximized: state => state.maximized
}

const mutations = {
  setWindowMaximized(state, flag){
    state.maximized !== flag && (state.maximized = flag)
  } 
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}

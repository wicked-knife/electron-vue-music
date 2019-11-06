const state = {
  maximized: false // 主应用窗口是否最大化
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

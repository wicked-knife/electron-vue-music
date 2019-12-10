const state = {
  sidebarVisibility: true
}

const getters = {
  sidebarVisibility: state => state.sidebarVisibility
}

const mutations = {
  showSideBar: state => state.sidebarVisibility = true,
  hideSideBar: state => state.sidebarVisibility = false
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}

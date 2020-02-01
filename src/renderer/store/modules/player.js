import MusicPlayer from '@/common/player.js'

const state = {
  player: new MusicPlayer()
}

const getters = {
  player: state => state.player
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

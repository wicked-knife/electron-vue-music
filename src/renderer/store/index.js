import window from './modules/window'
import user from './modules/user'
import app from './modules/app'
import MusicPlayer from '@/common/player'

const state = {
  player: new MusicPlayer()
}

const getters = {
  player: state => state.player
}

const mutations = {}

const actions = {}


export default {
  state,
  getters,
  mutations,
  actions,
  modules: {
    window,
    user,
    app
  }
}

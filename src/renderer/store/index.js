import window from './modules/window'
import user from './modules/user'
import app from './modules/app'
import MusicPlayer from '@/common/player'

const state = {
  player: new MusicPlayer(),
  playType: 'normal' // normal: 普通模式 fm: 私人fm
}

const getters = {
  player: state => state.player,
  playType: state => state.playType
}

const mutations = {
  setPlayType: (state, playType) => {
    if(!['normal', 'fm'].includes(playType)) {
      throw new Error('playType must be "normal" or "fm"')
    }
    state.playType = playType
  }
}

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

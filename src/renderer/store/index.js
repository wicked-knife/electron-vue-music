import window from './modules/window'
import user from './modules/user'
import app from './modules/app'
import MusicPlayer from '@/common/player'

const state = {
  player: new MusicPlayer(),
  playType: 'normal', // normal: 普通模式 fm: 私人fm
  FMPlayList: []
}

const getters = {
  player: state => state.player,
  playType: state => state.playType,
  FMPlayList: state => state.FMPlayList
}

const mutations = {
  setPlayType: (state, playType) => {
    if(!['normal', 'fm'].includes(playType)) {
      throw new Error('playType must be "normal" or "fm"')
    }
    state.playType = playType
  },
  // 设置FM播放列表
  setFMPlayList: (state, playList) => {
    state.FMPlayList = playList
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

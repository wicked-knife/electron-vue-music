import window from './modules/window'
import user from './modules/user'
import app from './modules/app'
import MusicPlayer from '@/common/player'

const state = {
  player: new MusicPlayer(),
  playType: 'normal', // normal: 普通模式 fm: 私人fm
  FMPlayList: [],
  playlist: []
}

const getters = {
  player: state => state.player,
  playType: state => state.playType,
  FMPlayList: state => state.FMPlayList,
  playlist: state => state.playlist
}

const mutations = {
  setPlayType: (state, playType) => {
    if(!['normal', 'fm'].includes(playType)) {
      throw new Error('playType must be "normal" or "fm"')
    }
    state.playType = playType
  },
  // 设置FM播放列表
  setFMPlayList: (state, playlist) => {
    state.FMPlayList = playlist
  },
  // 设置普通播放列表
  setPlaylist: (state, playlist) => {
    state.playlist = playlist
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

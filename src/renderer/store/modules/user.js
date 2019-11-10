import {getPersistUserInfo, clearPersistUserInfo} from '../persist/userInfo.js'
import {getPersistDailySign, persistDailySign, clearPersistDailySign} from '../persist/dailySign.js'
const { cookies } = require('electron').remote.session.defaultSession


const state = {
  loginState: false, // 用户当前登录状态
  userInfo: getPersistUserInfo(), // 用户信息
  dailySigned: getPersistDailySign() ? getPersistDailySign() === (new Date()).toDateString() ? true : false : false
}

const getters = {
  loginState: state => state.loginState,
  userInfo: state => state.userInfo,
  dailySigned: state => state.dailySigned
}

const mutations = {
  setLoginState: (state, loginState) => state.loginState = loginState,
  setUserInfo: (state, userInfo) => state.userInfo = userInfo,
  // 用户的上一次签到信息保存在本地，签到时更新新的签到信息到本地
  dailySign: state => {
    state.dailySigned = true
    persistDailySign()
  },
  clearDailySign: state => state.dailySigned = false
}

const actions = {
  logout: ({commit}) => {
    // 清除用户状态（注销登录时用，本地存储的用户信息及签到信息也一并清除）
    commit('setLoginState', false)
    commit('setUserInfo', null)
    clearPersistUserInfo()
    clearPersistDailySign()
  },
  login: ({commit}, userInfo) => {
    commit('setLoginState', true)
    commit('setUserInfo', userInfo)

    // 登录时将签到信息也一并清除
    commit('clearDailySign')
  },
  // 检查登录状态，通过检查cookie来判断登录状态
  // 每次应用启动时都要检查
  checkLoginState: () => {
    return new Promise(resolve => {
      Promise.all([cookies.get({name: 'MUSIC_U'}), cookies.get({name: '__csrf'})]).then(cookieList => {
        return cookieList.every(l => l.length !== 0)
      }).then(loginState => {
        // commit('setLoginState', loginState)
        resolve(loginState)
      })
    })

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

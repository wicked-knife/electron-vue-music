import {getPersistUserInfo, clearPersistUserInfo} from '../persist/userInfo.js'
import {getPersistDailySign, persistDailySign, clearPersistDailySign} from '../persist/dailySign.js'


const state = {
  loginState: !!getPersistUserInfo(), // 用户当前登录状态
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
  // 清除用户状态（注销登录时用，本地存储的用户信息及签到信息也一并清除）
  clearUserInfo: state => {
    state.userInfo = null
    clearPersistUserInfo()
    clearPersistDailySign()
  },
  // 用户的上一次签到信息保存在本地，签到时更新新的签到信息到本地
  dailySign: state => {
    state.dailySigned = true
    persistDailySign()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}

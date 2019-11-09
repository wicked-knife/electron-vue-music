import {getPersistUserInfo, clearPersistUserInfo} from '../persist.js'


const state = {
  loginState: !!getPersistUserInfo(),
  userInfo: getPersistUserInfo(),
  dailySigned: false
}

const getters = {
  loginState: state => state.loginState,
  userInfo: state => state.userInfo
}

const mutations = {
  setLoginState: (state, loginState) => state.loginState = loginState,
  setUserInfo: (state, userInfo) => state.userInfo = userInfo,
  clearUserInfo: state => {
    state.userInfo = null
    clearPersistUserInfo()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}

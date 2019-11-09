import {getPersistUserInfo} from '../persist.js'


const state = {
  loginState: !!getPersistUserInfo(),
  userInfo: getPersistUserInfo()
}

const getters = {
  loginState: state => state.loginState,
  userInfo: state => state.userInfo
}

const mutations = {
  setLoginState: (state, loginState) => state.loginState = loginState,
  setUserInfo: (state, userInfo) => state.userInfo = userInfo
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}

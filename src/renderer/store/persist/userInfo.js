import store from './base'

const USER_INFO = 'USER_INFO' // 用户信息

// 存储用户信息（登陆成功时）
export const persistUserInfo = (userInfo) => {
  store.set(USER_INFO, userInfo)
}

export const getPersistUserInfo = () => store.get(USER_INFO)

export const clearPersistUserInfo = () => store.clear(USER_INFO)

import Store from 'electron-store'

const store = new Store()
const USER_INFO = 'USER_INFO'

export const persistUserInfo = (userInfo) => {
  store.set(USER_INFO, userInfo)
}

export const getPersistUserInfo = () => store.get(USER_INFO)

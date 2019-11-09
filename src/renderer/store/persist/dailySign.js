import store from './base'

const DAILY_SIGN = 'DAILY_SIGN'

export const persistDailySign = () => {
  store.set(DAILY_SIGN, new Date().toDateString())
}

export const getPersistDailySign = () => store.get(DAILY_SIGN)

export const clearPersistDailySign = () => store.clear(DAILY_SIGN)

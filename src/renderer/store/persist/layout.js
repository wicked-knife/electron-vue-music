import store from './base'

const HOME_LAYOUT = 'HOME_LAYOUT'

export const persistLayout = layout => {
  store.set(HOME_LAYOUT, layout)
}

export const getPersistLayout = () => store.get(HOME_LAYOUT)

import axios from '../base.js'

export const getBanner = () => axios.get('/banner?type=0')

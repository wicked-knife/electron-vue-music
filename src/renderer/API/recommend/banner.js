import axios from '../base.js'

// 推荐首页轮播图
export const getBanner = () => axios.get('/banner?type=0')

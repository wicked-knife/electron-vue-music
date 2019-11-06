import axios from '../base.js'

// 获取推荐歌单
export const getRecommendSongList = (limit = 30) => axios.get('personalized', {params: {limit: limit}})

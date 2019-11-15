import axios from './base.js'

/*
### 电台banner
说明 : 调用此接口,可获取电台banner

**接口地址 :** `/dj/banner`
*/

export const getRadioBanner = () => axios.get('/dj/banner')


export const getRadioCateList = () => axios.get('/dj/catelist')

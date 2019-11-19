import axios from './base.js'

/*
### 电台banner
说明 : 调用此接口,可获取电台banner

**接口地址 :** `/dj/banner`
*/

export const getRadioBanner = () => axios.get('/dj/banner')

/*
### 电台 - 分类

说明 : 调用此接口 , 可获得电台类型
*/
export const getRadioCateList = () => axios.get('/dj/catelist')


/*
### 电台 - 分类推荐

说明 : 登陆后调用此接口 , 传入分类,可获得对应类型电台列表

**必选参数 :** `type`: 电台类型 , 数字 , 可通过`/dj/catelist`获取 , 对应关系为
id 对应 此接口的 type, name 对应类型

**接口地址 :** `/dj/recommend/type`
*/

export const getRadioListByCate = (type) => axios.get('/dj/recommend/type', {params: {type}})


/*
### 电台 - 推荐类型

说明 : 登陆后调用此接口, 可获得电台推荐类型


**接口地址 :** `/dj/category/recommend`
*/

export const getRecommendRadioCate = () => axios.get('/dj/category/recommend')

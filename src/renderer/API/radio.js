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


/*
### 电台 - 类别热门电台

**可选参数 :**

`limit` : 返回数量 , 默认为 30

`offset` : 偏移数量，用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0

`cateId`: 类别 id,可通过 `/dj/category/recommend` 接口获取

**接口地址 :** `/dj/radio/hot`
*/

export const getHotRadioListByCate = ({limit = 12, page = 1, cateId}) => axios.get('/dj/radio/hot', {params: {limit, offset: (page - 1) * limit, cateId}})

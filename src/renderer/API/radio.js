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

/*
### 电台 - 详情

说明 : 登陆后调用此接口 , 传入`rid`, 可获得对应电台的详情介绍

**必选参数 :** `rid`: 电台 的 id

**接口地址 :** `/dj/detail`
*/


export const getRadioDetail = rid => axios.get('/dj/detail', {params: {rid}})

/*
### 电台 - 节目详情
说明 : 调用此接口传入电台节目id,可获得电台节目详情

**必选参数 :** `id`: 电台节目 的 id

**接口地址 :** `/dj/program/detail`
*/

export const getRadioProgramDetail = id => axios.get('/dj/program/detail', {params: {id}})

/*

### 电台 - 节目

说明 : 登陆后调用此接口 , 传入`rid`, 可查看对应电台的电台节目以及对应的 id, 需要
注意的是这个接口返回的 mp3Url 已经无效 , 都为 null, 但是通过调用 `/song/url` 这
个接口 , 传入节目 id 仍然能获取到节目音频 , 如 `/song/url?id=478446370` 获取代
码时间的一个节目的音频

**必选参数 :** `rid`: 电台 的 id

**可选参数 :**

`limit` : 返回数量 , 默认为 30

`offset` : 偏移数量，用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0

`asc` : 排序方式,默认为 `false` (新 => 老 ) 设置 `true` 可改为 老 => 新 

**接口地址 :** `/dj/program`
*/

export const getRadioProgramList = ({rid, limit = 100, page = 1, asc = false}) => axios.get('/dj/program', {params: {rid, limit, offset: (page - 1) * limit, asc}})

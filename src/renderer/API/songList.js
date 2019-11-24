import axios from './base'

/*
### 歌单分类

说明 : 调用此接口,可获取歌单分类,包含 category 信息

**接口地址 :** `/playlist/catlist`
*/

export const getAllCateList = () => axios.get('/playlist/catlist')

/*
### 热门歌单分类

说明 : 调用此接口,可获取歌单分类,包含 category 信息

**接口地址 :** `/playlist/hot`
*/

export const getHotCateList = () => axios.get('/playlist/hot')

/*
### 歌单 ( 网友精选碟 )

说明 : 调用此接口 , 可获取网友精选碟歌单

**可选参数 :** `order`: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为
'hot'

`cat`:`cat`: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为
"全部",可从歌单分类接口获取(/playlist/catlist)

**接口地址 :** `/top/playlist`

**调用例子 :** `/top/playlist?limit=10&order=new`
*/

export const getSongList = ({cat, limit = 50, page = 1}) => axios.get('/top/playlist', {params: {cat, limit,  offset: (page - 1) * limit }})


/*

### 获取精品歌单

说明 : 调用此接口 , 可获取精品歌单

**可选参数 :** `cat`: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为
"全部",可从歌单分类接口获取(/playlist/catlist)

`limit`: 取出歌单数量 , 默认为 20

`before`: 分页参数,取上一页最后一个歌单的 `updateTime` 获取下一页数据

**接口地址 :** `/top/playlist/highquality`
*/

export const getHighQualitySongList = ({limit = 20, before, cat = '全部歌单'}) => axios.get('/top/playlist/highquality', {params: {limit, before, cat}})


/*

### 获取歌单详情

说明 : 歌单能看到歌单名字 , 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可
以获取对应歌单内的所有的音乐，但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 `song/detail` 接口获取所有歌曲的详情 ([https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452](https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452))

**必选参数 :** `id` : 歌单 id

**可选参数 :** `s` : 歌单最近的 s 个收藏者

**接口地址 :** `/playlist/detail`
*/

export const getSongListDetail = id => axios.get('/playlist/detail', {params: {id}})


/*
### 歌单收藏者
说明 : 调用此接口 , 传入歌单 id 可获取歌单的所有收藏者  
**必选参数 :**

`id` : 歌单 id

**可选参数 :** `limit`: 取出评论数量 , 默认为 20

`offset`: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*20, 其中 20 为 limit 的值

**接口地址 :** `/playlist/subscribers`
*/

export const getSongListSubscribers = ({id, page = 1, limit = 20}) => axios.get('/playlist/subscribers', {params: {id, offset: (page - 1) * limit, limit}})

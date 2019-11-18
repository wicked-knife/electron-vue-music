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

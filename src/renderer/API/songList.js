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

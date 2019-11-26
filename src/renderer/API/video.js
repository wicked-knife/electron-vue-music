import axios from './base.js'

/*
### 获取视频标签列表 
说明 : 调用此接口 , 可获取视频标签列表  

**接口地址 :** `/video/group/list`
*/

export const getVideoTagList = () => axios.get('/video/group/list')


/*
### 获取视频标签下的视频
说明 : 调用此接口 , 传入`id`,可获取到相关的视频。  (ps：无法分页，每次请求返回内容都不一样，官方桌面软件是打开先请求两次，然后每次滚动到底部的时候再请求一次)

**必选参数 :** `id`: videoGroup 的 id

**接口地址 :** `/video/group`
*/

export const getVideoByTag = id => axios.get('/video/group', {params: {id, _t: Math.random()}})

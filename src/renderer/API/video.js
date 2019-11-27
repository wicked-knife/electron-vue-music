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


/*
### 全部 mv
说明 : 调用此接口 , 可获取全部 mv

**可选参数 :**   
`area`: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
`type`: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部  

`order`: 排序,可选值为上升最快,最热,最新,不填则为上升最快  

`limit`: 取出数量 , 默认为 30  

`offset`: 偏移数量 , 用于分页 , 如 :( 页数 -1)\*50, 其中 50 为 limit 的值 , 默认
为 0  

**接口地址 :** `/mv/all`
*/
export const getAllVideo = ({area = '全部', type = '全部', order = '上升最快', limit = 16, page = 1}) => axios.get('/mv/all', {params: {area, type, order,limit, offset: (page - 1) * limit}})

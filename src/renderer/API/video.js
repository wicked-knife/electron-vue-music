import axios from './base.js'

/*
### 获取视频标签列表 
说明 : 调用此接口 , 可获取视频标签列表  

**接口地址 :** `/video/group/list`
*/

export const getVideoTagList = () => axios.get('/video/group/list')


/*
### 获取视频标签下的视频

*** 接口需要登录 ***

说明 : 调用此接口 , 传入`id`,可获取到相关的视频。  (ps：无法分页，每次请求返回内容都不一样，官方桌面软件是打开先请求两次，然后每次滚动到底部的时候再请求一次)

**必选参数 :** `id`: videoGroup 的 id

**接口地址 :** `/video/group`
*/

export const getVideoByTag = id => axios.get('/video/group', {params: {id, _t: new Date().getTime()}})


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

/*
### 获取 mv 数据

说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应
MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频
网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口

**必选参数 :** `mvid`: mv 的 id

**接口地址 :** `/mv/detail`

**调用例子 :** `/mv/detail?mvid=5436712`
*/

export const getMVData = mvid => axios.get('/mv/detail', {params: {mvid}})

/*
### mv 地址

说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址

**可选参数 :** `id`: mv id

**接口地址 :** `/mv/url`

**调用例子 :**

`/mv/url?id=5436712`
*/

export const getMVPlayURL = id => axios.get('/mv/url', {params: {id}})

/*

### 视频详情

说明 : 调用此接口 , 可获取视频详情

**必选参数 :** `id`: 视频 的 id

**接口地址 :** `/video/detail`

**调用例子 :** `/video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D`

*/

export const getVideoData = id => axios.get('/video/detail', {params: {id}})

/*
### 获取视频播放地址

说明 : 调用此接口 , 传入视频 id,可获取视频播放地址

**必选参数 :** `id`: 视频 的 id

**接口地址 :** `/video/url`

**调用例子 :** `/video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D`
*/

export const getVideoPlayURL = id => axios.get('/video/url', {params: {id}})

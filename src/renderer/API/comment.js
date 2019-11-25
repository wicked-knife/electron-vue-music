import axios from './base.js'

/*
### 歌单评论

说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要
登录 )

**必选参数 :** `id`: 歌单 id

**可选参数 :** `limit`: 取出评论数量 , 默认为 20

`offset`: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*20, 其中 20 为 limit 的值  

`before`: 分页参数,取上一页最后一项的 `time` 获取下一页数据(获取超过5000条评论的时候需要用到)

**接口地址 :** `/comment/playlist`

*/

export const getSongListComment = ({id, limit = 20, page = 1, before}) => axios.get('/comment/playlist', {params: {id, limit, offset: (page - 1) * limit, before}})

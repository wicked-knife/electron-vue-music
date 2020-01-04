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


/*
### 热门评论

说明 : 调用此接口 , 传入 type, 资源 id 可获得对应资源热门评论 ( 不需要登录 )

**必选参数 :**

`id` : 资源 id

`type`: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型

```
0: 歌曲

1: mv

2: 歌单

3: 专辑

4: 电台

5: 视频
```

**可选参数 :** `limit`: 取出评论数量 , 默认为 20

`offset`: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*20, 其中 20 为 limit 的值  

`before`: 分页参数,取上一页最后一项的 `time` 获取下一页数据(获取超过5000条评论的时候需要用到)

**接口地址 :** `/comment/hot`
*/

export const getHotComments = ({id, type, limit = 20, page = 1, before}) => axios.get('/comment/hot', {params: {id, type, limit, page, offset: (page - 1) * limit ,before}})



/*
### 视频评论

说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 视频 的所有评论 (
不需要登录 )

**必选参数 :** `id`: 视频的 id

**可选参数 :** `limit`: 取出评论数量 , 默认为 20

`offset`: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*20, 其中 20 为 limit 的值  

`before`: 分页参数,取上一页最后一项的 `time` 获取下一页数据(获取超过5000条评论的时候需要用到)

**接口地址 :** `/comment/video`

**调用例子 :** `/comment/video?id=89ADDE33C0AAE8EC14B99F6750DB954D`
*/

export const getVideoComments = ({id, page = 1, limit = 50}) => axios.get('/comment/video', {params: {id, offset: (page - 1) * limit, limit,}})

/*
### mv 评论

说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要
登录 )

**必选参数 :** `id`: mv id

**可选参数 :** `limit`: 取出评论数量 , 默认为 20

`offset`: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*20, 其中 20 为 limit 的值  

`before`: 分页参数,取上一页最后一项的 `time` 获取下一页数据(获取超过5000条评论的时候需要用到)

**接口地址 :** `/comment/mv`
*/

export const getMVComments = ({id, page = 1, limit = 50}) => axios.get('/comment/mv', {params: {id, offset: (page - 1) * limit, limit}})


/*
### 给评论点赞

说明 : 调用此接口 , 传入 type, 资源 id, 和评论 id cid 和 是否点赞参数 t 即可给对
应评论点赞 ( 需要登录 )

**必选参数 :** `id` : 资源 id, 如歌曲 id,mv id

`cid` : 评论 id

`t` : 是否点赞 ,1 为点赞 ,0 为取消点赞

`tpye`: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型

```
0: 歌曲

1: mv

2: 歌单

3: 专辑

4: 电台

5: 视频

6: 动态
```

**接口地址 :** `comment/like`

**调用例子 :** `/comment/like?id=29178366&cid=12840183&t=1&type=0` 对应给 [https://music.163.com/#/song?id=29178366](https://music.163.com/#/song?id=29178366) 最热门的评论点赞


注意： 动态点赞不需要传入 id 参数，需要传入动态的 `threadId`  参数,如：`/comment/like?type=6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0`， `threadId` 可通过 `/event`，`/user/event` 接口获取

*/

export const togglePraiseComment = ({cid, t, type, id}) => {
  return axios.get('/comment/like', {params: {cid, t, type, id}})
}

/*
### 发送/删除评论

说明 : 调用此接口,可发送评论或者删除评论

**接口地址 :** `/comment`

1. 发送评论

   **必选参数**

   `t`:1 发送, 2 回复

   `type`: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型

   ```
   0: 歌曲

   1: mv

   2: 歌单

   3: 专辑

   4: 电台

   5: 视频

   6: 动态
   ```

   `id`:对应资源 id

   `content` :要发送的内容

   `commentId` :回复的评论id (回复评论时必填)

   **调用例子** : `/comment?t=1&type=1&id=5436712&content=test` (往广岛之恋 mv 发送评论: test)

   注意：如给动态发送评论，则不需要传 id，需要传动态的 `threadId`,如：`/comment?t=1&type=6&threadId=A_EV_2_6559519868_32953014&content=test`

2. 删除评论

   **必选参数**

   `t`:0 删除

   `type`: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型  
   

   ```
   0: 歌曲

   1: mv

   2: 歌单

   3: 专辑

   4: 电台

   5: 视频

   6: 动态
   
   ```

   `id`:对应资源 id
   `content` :内容 id,可通过 `/comment/mv` 等接口获取

   **调用例子** : `/comment?t=0&type=1&id=5436712&commentId=1535550516319` (在广岛之恋 mv 删除评论)
    

    注意：如给动态删除评论，则不需要传 id，需要传动态的 `threadId`,如：`/comment?t=0&type=6&threadId=A_EV_2_6559519868_32953014&commentId=1419516382`

*/

export const submitComment = ({type, id, content}) => {
  return axios.get('/comment', {params: {type, id, content, t: 1}})
}

export const replyComment = ({type, id, content, commentId}) => {
  return axios.get('/comment', {params: {type, id, content, commentId, t: 2}})
}

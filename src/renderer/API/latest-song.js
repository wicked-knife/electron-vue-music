import axios from './base.js'
/*

### 新歌速递

说明 : 调用此接口 , 可获取新歌速递

**必选参数 :**

`type`: 地区类型 id,对应以下:

```
全部:0

华语:7

欧美:96

日本:8

韩国:16
```

**接口地址 :** `/top/song`
*/


export const getLatestSongByLan = (languageCode = 0) => axios.get('/top/song', {params: {type: languageCode}})


/*
### 新碟上架

说明 : 调用此接口 , 可获取新碟上架列表 , 如需具体音乐信息需要调用获取专辑列表接
口 `/album` , 然后传入 id, 如 `/album?id=32311&limit=30`

**可选参数 :** `limit`: 取出数量 , 默认为 50

`offset`: 偏移数量 , 用于分页 , 如 :( 页数 -1)\*50, 其中 50 为 limit 的值 , 默认
为 0

**接口地址 :** `/top/album`
*/

export const getLatestAlbum = (page = 1, limit = 20) => axios.get('/top/album', {params: {limit, offset: (page - 1) * limit}})

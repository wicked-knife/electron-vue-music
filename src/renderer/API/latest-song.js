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

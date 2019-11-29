import axios from './base.js'
/*

### 所有榜单

说明 : 调用此接口,可获取所有榜单
**接口地址 :** `/toplist`
*/

export const getRankList = () => axios.get('/toplist')

/*
### 排行榜

说明 : 调用此接口 , 传入数字 idx, 可获取不同排行榜

**必选参数 :** `idx`: 排行榜索引 , 对应以下排行榜

```
["云音乐新歌榜","云音乐热歌榜","网易原创歌曲榜","云音乐飙升榜","云音乐国电榜","UK排行榜周榜","美国Billboard周榜","KTV唛榜","iTunes榜","Hit FM Top榜","日本Oricon周榜","韩国Melon排行榜周榜","韩国Mnet排行榜周榜","韩国Melon原声周榜","中国TOP排行榜（港台榜）","中国TOP排行榜（内地榜）","香港电台中文歌曲龙虎榜","华语金曲榜","中国嘻哈榜","法国 NRJ Vos Hits 周榜","台湾Hito排行榜","Beatport全球电子舞曲榜","云音乐ACG音乐榜","云音乐说唱榜","云音乐古典音乐榜","云音乐电音榜","抖音排行榜","新声榜","云音乐韩语榜","英国Q杂志中文版周榜","电竞音乐榜","云音乐欧美热歌榜","云音乐欧美新歌榜","说唱TOP榜","云音乐ACG动画榜","云音乐ACG游戏榜","云音乐ACG VOCALOID榜"]

```

**接口地址 :** `/top/list`

**调用例子 :** `/top/list?idx=6`
*/

export const getMusicList = idx => axios.get('/top/list', {params: {idx}})

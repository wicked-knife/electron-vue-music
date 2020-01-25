import axios from './base'

/*
### 获取歌曲详情

说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 `,` 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)

**必选参数 :** `ids`: 音乐 id, 如 `ids=347230`

**接口地址 :** `/song/detail`

**调用例子 :** `/song/detail?ids=347230`,`/song/detail?ids=347230,347231`
*/

export const getSongDetail = ids => axios.get('/song/detail', {params: {ids: Array.isArray(ids) ? ids.join(',') : ids}})


/*
### 获取音乐 url

说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口
, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url( 不需要登录 )

> 注 : 部分用户反馈获取的 url 会 403,[hwaphon](https://github.com/hwaphon)找到的
> 解决方案是当获取到音乐的 id 后，将
> https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放

**必选参数 :** `id` : 音乐 id

**可选参数 :** `br`: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推

**接口地址 :** `/song/url`

**调用例子 :** `/song/url?id=33894312` `/song/url?id=405998841,33894312`
*/

export const getSongURL = id => axios.get('/song/url', {params: {id: Array.isArray(id) ? id.join(',') : id}})



/*
### 喜欢音乐

说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐

**必选参数 :** `id`: 歌曲 id

**可选参数 :** `like`: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢

**接口地址 :** `/like`

**调用例子 :** `/like?id=347230`

返回数据如下图 :

![喜欢成功](https://raw.githubusercontent.com/Binaryify/NeteaseCloudMusicApi/master/static/like.png)

喜欢成功则返回数据的 code 为 200, 其余为失败
*/

export const toggleLikeSong = (id, flag)=> axios.get('/like', {params: {like: !!flag, id}})

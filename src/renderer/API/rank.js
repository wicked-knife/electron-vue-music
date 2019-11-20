import axios from './base.js'
/*

### 所有榜单

说明 : 调用此接口,可获取所有榜单
**接口地址 :** `/toplist`
*/

export const getRankList = () => axios.get('/toplist')

import axios from './base'

/*
### 私人 FM

说明 : 私人 FM( 需要登录 )

**接口地址 :** `/personal_fm`

**调用例子 :** `/personal_fm`
*/

export const getPersonalFM = () => axios.get('/personal_fm')

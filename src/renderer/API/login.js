import axios from './base.js'

/*
  1. 手机登录
  必选参数 : phone: 手机号码 password: 密码

  接口地址 : /login/cellphone

  可选参数 : countrycode: 国家码，用于国外手机号登陆，例如美国传入：1

  调用例子 : /login/cellphone?phone=xxx&password=yyy
*/
export const loginByCellphone = (phoneNumber, password) => axios.get('/login/cellphone', {params: {phone: phoneNumber, password}})
/*
邮箱登录
~~ 注意 : 此接口被网易和谐了 , 待修复 , 暂时使用手机登录 (2017.05.20)~~

更新 : 此接口已经可以正常使用(2018.07.03)

必选参数 : email: 邮箱
password: 密码

接口地址 : /login

调用例子 : /login?email=xxx@163.com&password=yyy

返回数据如下图 : 登录

完成登录后 , 会在浏览器保存一个 Cookies 用作登录凭证 , 大部分 API 都需要用到这个 Cookies

注意
调用登录接口的速度比调用其他接口慢 , 因为登录过程调用了加密算法
*/

export const loginByEmail = (email, password) => axios.get('/login', {params: {email: email, password}})

/*
刷新登录
说明 : 调用此接口 , 可刷新登录状态

调用例子 : /login/refresh
*/

export const refreshLogin = () => axios.get('/login/refresh')


/*
登录状态
说明 : 调用此接口,可获取登录状态
*/

export const getLoginStatus = () => axios.get('/login/status')

/*
退出登录
说明 : 调用此接口 , 可退出登录

调用例子 : /logout
*/

export const logout = () => axios.get('/logout')

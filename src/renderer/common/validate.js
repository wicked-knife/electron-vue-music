const emailValidReg =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// 校验中国大陆手机号
const phoneNumberValidReg = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/

export const validatePhoneNumber = phoneNumber => phoneNumberValidReg.test(phoneNumber)

export const validateEmail = email => emailValidReg.test(email)

const createTypeValidator = ctor => p => Object.prototype.toString.call(p) === `[object ${ctor.name}]`


export const isObject = createTypeValidator(Object)

export const isArray = createTypeValidator(Array)

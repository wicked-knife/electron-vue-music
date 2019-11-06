import Vue from 'vue'
import alertTemplate from './alert.vue'
import {isObject} from '@/common/utils.js'

const AlertCtor = Vue.extend(alertTemplate)

const defaults = {
  timeout: 6000,
  message: '',
  color: ''
}


// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showAlert(text) {
  if(!text) {throw new Error('$alert need at least one parameter.')}
  let _data = null
  if(isObject(text)) {
    _data = {...defaults, ...text}
  } else {
    _data = {...defaults, text}
  }

  // 实例化一个 alert组件实例
  const alertIns = new AlertCtor({
    el: document.createElement('div'),
    data() {
      return {
        ..._data,
        visiable:false
      }
    }
  })

  // 把 实例化的 alert 添加到 body 里
  document.body.firstElementChild.appendChild(alertIns.$el)
  alertIns.visiable = true

  // 这个组件消失后vuetify会自动销毁掉，无需手动销毁
}


function registerAlert(_Vue) {
  _Vue.prototype.$alert = showAlert
}


export default registerAlert

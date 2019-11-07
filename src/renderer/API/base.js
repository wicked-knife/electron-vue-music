import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.response.use(response => {
  if(response.data.code === 200) {
    return response
  }
}, err => {
  Vue.prototype.$alert('网络错误')
  return Promise.reject(err)
})

export default axios

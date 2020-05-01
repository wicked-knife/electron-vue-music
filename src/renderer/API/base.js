import axios from 'axios'
import {showAlert} from '@/base/alert/alert'

axios.defaults.baseURL = 'http://localhost:3000'

axios.defaults.withCredentials = true

axios.interceptors.response.use(response => {
  if(response.status >= 200 && response.status < 300 && response.data.code >= 200 && response.data.code < 300) {
    return response.data
  } else {
    return Promise.reject(response.data)
  }
}, err => {
  showAlert(err.response.data.msg)
  return Promise.reject(err)
})

export default axios

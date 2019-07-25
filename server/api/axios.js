const axios = require('axios')
const qs = require('qs')

// axios 配置
axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器，POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    console.log('看看axios请求拦截对post参数做了什么',config.data)
    if (qs.stringify(config.data)) {
      console.log('格式化后的post参数',qs.stringify(config.data));
      config.data = qs.stringify(config.data);
    }
  }
  return config
}, (error) => {
  return Promise.reject(error);
})

// 响应拦截器，返回状态判断
axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  return Promise.reject(error)
})

export function Axios (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  Axios
}

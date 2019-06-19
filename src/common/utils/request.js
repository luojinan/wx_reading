import {devStage,webUrl} from './config'
import {promisifyUtil} from './promisify'
const wxRequest = promisifyUtil(wx.request)

const request = ({url,methods,data}) => {
  if (devStage === 'dev') return requestMock(url)
  else return requestServer(url, methods, data)
}
// mock请求
function requestMock (url) {
  // import {result} from `@/mock/${url}.js`
  let {data} = require('@/mock/' + url + '.js')
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}
// 请求真实接口
function requestServer (url, methods, data) {
  return new Promise((resolve, reject) => {
    // 请求头的设置
    let headerParam = {
      // 写不写都行应该，post的时候要用另一种请求头？做判断？
      'Content-Type': 'application/json'
    }
    wxRequest({
      url: `${webUrl}${url}`,
      methods,
      data,
      header: headerParam
    }).then(res => {
      console.log(url + '接口返回数据', res)
      if (parseInt(res.data.code) === 200) {
        resolve(res.data)
      }
      reject(res.data)
    }).catch(err => console.log(err))
  })

}

export default request

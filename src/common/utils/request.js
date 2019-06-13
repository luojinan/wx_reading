const devStage = 'dev'
const request = ({url, methods}) => {
  if (devStage === 'dev') return requestMock(url)
  else return requestServer(url)
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
function requestServer () {

}

export default request

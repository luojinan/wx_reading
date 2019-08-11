import Promise from 'bluebird'
import jwt from 'jsonwebtoken'
const verify = Promise.promisify(jwt.verify)

async function check (ctx, next) {
  let url = ctx.request.url
  // 登录 不用检查
  if (url == '/user/saveUser'||url == '/book/getTopBook/'||url == '/book/getBook') {
    console.log(url);
    await next()
  }
  else {
    console.log(url)
    // 规定token写在header 的 'autohrization' 
    // console.log('请求头', ctx.request)
    let token = ctx.request.headers['authorization']
    // 解码
    let payload = await verify(token, 'secret')
    console.log('解码后的token', payload)
    // 把解码后的token用户信息存入全局变量或者只把用户id存入全局变量
    let { time, timeout, _id } = payload
    ctx.state.userId = _id
    let data = new Date().getTime()
    if (data - time <= timeout) {
      // 未过期
      await next()
    } else {
      // 过期
      ctx.body = {
        status: 50014,
        message: 'token 已过期'
      };
    }
  }
}

export default check

/**
 * 用于把微信原生callback的api，转换为promise
 *
 * 示例：
 *      import {promisify} from '...'   // 这一部可以在app.vue中引入
 *      const showModal = promisify(wx.showModal)
 *      showModal({content:'确认删除？'}).then(res=>{})
 */

export function promisify (api) {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, { success: resolve, fail: reject }), ...params)
    })
  }
}
// 暴露的是一个对象
export default {
  promisify
}

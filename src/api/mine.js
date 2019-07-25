import request from '@/common/utils/request.js'

export function saveUser(data) {
  return request({
    url: 'user/saveUser',
    method: 'POST',
    data
  })
}
export function addBook(data) {
  return request({
    url: 'book/addBook',
    method: 'POST',
    data
  })
}
export default {
  saveUser
}

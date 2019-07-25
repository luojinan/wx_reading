import request from '@/common/utils/request.js'

export function getBook(query) {
  return request({
    url: 'book/getBook',
    method: 'GET',
    data: query
  })
}
export function getBookById(bookId) {
  return request({
    url: `book/getBookById/${bookId}`,
    method: 'GET'
  })
}
export function getTopBook() {
  return request({
    url: `book/getTopBook/`,
    method: 'GET'
  })
}
export default {
  getBook,
  getBookById,
  getTopBook  //获取首页轮播图--浏览量前9的图书
}

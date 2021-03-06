import request from '@/common/utils/request.js'

export function getBook(query) {
  return request({
    url: 'book/getBook',
    method: 'GET',
    data: query
  })
}
export function getTopBook() {
  return request({
    url: `book/getTopBook/`,
    method: 'GET'
  })
}
export function getBookById(bookId) {
  return request({
    url: `book/getBookById/${bookId}`,
    method: 'GET'
  })
}
export function getCommentList(bookId) {
  return request({
    url: `comment/getcommentList/${bookId}`,
    method: 'GET'
  })
}
export function addComment(data) {
  return request({
    url: `comment/addComment`,
    method: 'POST',
    data
  })
}
export default {
  getBook,
  getBookById,
  getCommentList,
  addComment,
  getTopBook // 获取首页轮播图--浏览量前9的图书
}

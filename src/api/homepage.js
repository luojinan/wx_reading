import request from '@/common/utils/request.js'

export function getBook(query) {
  return request({
    url: 'book/getBook',
    methods: 'GET',
    data: query
  })
}
export function getBookById(bookId) {
  return request({
    url: `book/getBookById/${bookId}`,
    methods: 'GET'
  })
}
export default {
  getBook,
  getBookById
}

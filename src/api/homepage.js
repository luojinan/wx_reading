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
export function getTopBook() {
  return request({
    url: `book/getTopBook/`,
    methods: 'GET'
  })
}
export default {
  getBook,
  getBookById,
  getTopBook  //获取首页轮播图--浏览量前9的图书
}

import request from '@/common/utils/request.js'

export function getBook(query) {
  return request({
    url: 'book/getBook',
    methods: 'GET',
    data: query
  })
}

export default {
  getBook
}

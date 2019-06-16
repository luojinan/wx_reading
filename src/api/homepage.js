import request from '@/common/utils/request.js'

export function getBook () {
  return request({
    url: 'book/getBook',
    methods: 'GET'
  })
}

export default {
  getBook
}

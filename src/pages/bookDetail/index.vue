<template>
  <div class="book-detail">图书详情页{{bookId}}</div>
</template>

<script>
import { getBookById } from '@/api/homepage'
export default {
  components: {
  },
  data () {
    return {
      bookId: ''
    }
  },
  methods: {
    async init () {
      const res = await getBookById(this.bookId)
      console.log(res,'前端获取到的图书详情数据');
    }
  },
  // onload生命周期返回当前页面不会执行
  onLoad () {
    this.bookId = this.$root.$mp.query.bookId
    this.init()
  }
}
</script>

<style scoped lang="scss">
@import "@/common/scss/vars.scss";
.book-detail {
}
</style>

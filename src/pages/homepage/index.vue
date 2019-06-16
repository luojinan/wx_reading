<template>
  <div class="homepage">
    <book-card v-for="(item,index) in bookList" :key="index"></book-card>
  </div>
</template>

<script>
import bookCard from '@/components/bookCard'
import { getBook } from '@/api/homepage'
export default {
  data () {
    return {
      bookList: ''
    }
  },
  components: {
    bookCard
  },
  methods: {
    async init () {
      const res = await getBook()
      if (res.code === 200) this.bookList = res.data
    }
  },
  onLoad () {
    console.log('启动小程序首页')
    this.init()
  }
}
</script>

<style scoped lang="scss">
.homepage {
  min-height: 100vh;
  background-color: #f2f2f2;
  /deep/ .book-card {
    margin-bottom: 20rpx;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

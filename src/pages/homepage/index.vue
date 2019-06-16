<template>
  <div class="homepage">
    <book-card v-for="(item,index) in bookList" :key="index" :bookData="item"></book-card>
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
      // 头部文本前加loading的api（一般不用，load一般写在拉出来的地方醒目一点）
      wx.showNavigationBarLoading()
      const res = await getBook()
      if (res.code === 200) this.bookList = res.data
      wx.hideNavigationBarLoading()
      // 手动关闭下拉刷新(即让页面弹回上去)，默认回弹的时间比较长
      wx.stopPullDownRefresh()
    }
  },
  // 在json里开启之后，即可使用此生命周期
  onPullDownRefresh () {
    this.init()
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

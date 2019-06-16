<template>
  <div class="homepage">
    <book-card v-for="(item,index) in bookList" :key="index" :bookData="item"></book-card>
    <p class="finishedText" v-if="page.finished">没有更多数据</p>
  </div>
</template>

<script>
import bookCard from '@/components/bookCard'
import { getBook } from '@/api/homepage'
export default {
  data () {
    return {
      bookList: '',
      page: {
        page: 0,
        finished: false
      }
    }
  },
  components: {
    bookCard
  },
  methods: {
    async init (more) {
      // 头部文本前加loading的api（一般不用，load一般写在拉出来的地方醒目一点）
      wx.showNavigationBarLoading()
      let query = {
        page: this.page.page,
        size: 5
      }
      const res = await getBook(query)
      // 当获取的页面数据小于一页的size并且不是因为数据少而没有分页的时候，分页结束
      if (res.data.length < query.size && this.page.page > 0) this.page.finished = true
      // 当是触底加载的时候传入参数more，此时数据拼接。没传入则代表直接赋值
      if (more) this.bookList = [...this.bookList, ...res.data]
      else {
        this.bookList = res.data
        // 手动关闭下拉刷新(即让页面弹回上去)，默认回弹的时间比较长
        wx.stopPullDownRefresh()
      }
      wx.hideNavigationBarLoading()
    }
  },
  // 触底加载，不需要再json中开启，可以直接使用
  onReachBottom () {
    if (this.page.finished) return
    this.page.page++
    this.init('more')  // 通过传参判断刷新和拼接状态
  },
  // 下拉刷新，在json里开启之后，即可使用此生命周期
  onPullDownRefresh () {
    // 刷新页面要重置分页数据
    this.page = {
      page: 0,
      finished: false
    }
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
  .finishedText{
    text-align: center;
    padding-bottom: 20rpx;
  }
}
</style>

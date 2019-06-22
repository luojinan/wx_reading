<template>
  <div class="homepage">
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="6000"
      :duration="1000"
      :circular="true"
    >
      <div v-for="(top,imgindex) in tops" :key="imgindex" class="swiper-item_wrapper">
        <swiper-item>
          <img
            class="slide-image"
            mode="aspectFit"
            v-for="(item,index) in top"
            :key="index"
            :src="item.images[0].small"
          >
        </swiper-item>
      </div>
    </swiper>
    <book-card
      v-for="(item,index) in bookList"
      :key="index"
      :bookData="item"
      @click="toDetail(item._id)"
    ></book-card>
    <p class="finishedText" v-if="page.finished">没有更多数据</p>
  </div>
</template>

<script>
import bookCard from '@/components/bookCard'
import { getBook, getTopBook } from '@/api/homepage'
export default {
  data () {
    return {
      bookList: '',
      topBookList: '',
      page: {
        page: 0,
        finished: false
      }
    }
  },
  components: {
    bookCard
  },
  computed: {
    tops () {
      return [this.topBookList.slice(0, 3), this.topBookList.slice(3, 6), this.topBookList.slice(6)]
    }
  },
  methods: {
    toDetail (bookId) {
      wx.navigateTo({ url: `/pages/bookDetail/main?bookId=${bookId}` })
    },
    async getTopBook () {
      const res = await getTopBook()
      this.topBookList = res.data
    },
    async init (more) {
      // 头部文本前加loading的api（一般不用，load一般写在拉出来的地方醒目一点）
      wx.showNavigationBarLoading()
      let query = {
        page: this.page.page,
        size: 5
      }
      const res = await getBook(query)
      // 当获取的页面数据小于一页的size并且不是因为数据少而没有分页的时候，分页结束
      if (res.data.length <= query.size && this.page.page > 0) this.page.finished = true
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
    this.init('more') // 通过传参判断刷新和拼接状态
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
    this.getTopBook() // 获取轮播图接口数据
  }
}
</script>

<style scoped lang="scss">
.homepage {
  min-height: 100vh;
  background-color: #f2f2f2;
  ._swiper {
    margin-top: 5rpx;
    .slide-image{
      width: 33%;
      height: 250rpx;
    }
  }
  /deep/ .book-card {
    margin-bottom: 20rpx;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .finishedText {
    text-align: center;
    padding-bottom: 20rpx;
  }
}
</style>

<template>
  <div class="book-detail">
    <div class="book-detail_header--bg">
      <img :src="bookInfo.images[0].small" mode="aspectFill">
    </div>
    <div class="book-detail_header">
      <img :src="bookInfo.images[0].small" mode="aspectFill" class="book-detail_header--book">
      <h1>{{bookInfo.title}}</h1>
      <p>{{bookInfo.author}}</p>
    </div>
  </div>
</template>

<script>
import { getBookById } from '@/api/homepage'
export default {
  components: {
  },
  data () {
    return {
      bookId: '',
      bookInfo: ''
    }
  },
  methods: {
    async init () {
      const res = await getBookById(this.bookId)
      this.bookInfo = res.data
      console.log(res, '前端获取到的图书详情数据')
      // 微信api动态头部标题
      wx.setNavigationBarTitle({
        title: this.bookInfo.title
      })
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
  .book-detail_header--bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 500rpx;
    z-index: -1;
    overflow: hidden;
    img {
      width: 100%;
      filter: blur(15px);
    }
  }
  .book-detail_header {
    width: 100%;
    height: 500rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    img {
      width: 240rpx;
      height: 240rpx;
      margin-bottom: 20rpx;
    }
    h1{
      margin-bottom: 20rpx;
      font-size: 36rpx;
    }
  }
}
</style>

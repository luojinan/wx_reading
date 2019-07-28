<template>
  <div class="book-detail">
    <div class="book-detail_header--bg">
      <img :src="bookInfo.images&&bookInfo.images[0].small" mode="aspectFill">
    </div>
    <div class="book-detail_header">
      <img :src="bookInfo.images&&bookInfo.images[0].small" mode="aspectFill" class="book-detail_header--book">
      <h1>{{bookInfo.title}}</h1>
      <p>{{bookInfo.author}}</p>
    </div>
    <!-- 页面内容-用户信息 -->
    <div class="book-detail_user--wrapper">
      <div class="book-detail_user">
        <img :src="bookInfo.user&&bookInfo.user.avatar" alt="">
        <p>{{bookInfo.user&&bookInfo.user.userName}}</p>
      </div>
      <div class="book-detail_rate">
        {{bookInfo.rating?bookInfo.rating.average:'暂无评分'}}
        <rate v-if="bookInfo.rating" :rate="bookInfo.rating.average" />
      </div>
    </div>
    <!-- 页面内容-出版信息 -->
    <div class="book-detail_produce">
      <p>{{bookInfo.publisher}}</p>
      <p>{{bookInfo.price}}元</p>
    </div>
    <!-- 页面内容-图书标签 -->
    <div class="book-detail_tags">
      <div v-for="(tag,index) in bookInfo.tags" :key="index" class="book-detail_badge">{{tag.name}} {{tag.count}}</div>
    </div>
    <!-- 页面内容-图书简介 -->
    <div class="book-detail_summary">
      <p v-for="(sum,index) in bookInfo.summary" :key="index">{{sum}}</p>
    </div>
    <!-- 输入评论部分 -->
    <div class="book-detail_comment">
      <textarea v-model="comment" :maxlength="100" placeholder='请输入图书短评'></textarea>
      <div class="location-switch">
        地理位置：
        <switch color='#ea5a49' :checked='location' @change="getLocation" ></switch>
        <span>{{location}}</span>
      </div>
      <div class="phone-switch">
        手机型号：
        <switch color='#ea5a49' :checked='phoneSys' @change="getPhoneSys" ></switch>
        <span>{{phoneSys}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import rate from '@/components/rate'
import { getBookById } from '@/api/homepage'
export default {
  components: {
    rate
  },
  data () {
    return {
      bookId: '',
      bookInfo: '',
      location: '',
      phoneSys: ''
    }
  },
  methods: {
    getPhoneSys (e) {
      // 判断是否选中
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        console.log('手机设备信息', phoneInfo)
        this.phoneSys = phoneInfo.model
      } else this.phoneSys = ''
    },
    getLocation () {

    },
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
    position: absolute;
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
  .book-detail_user--wrapper{
    display: flex;
    justify-content: space-between;
    padding: 20rpx 30rpx 10rpx;
    .book-detail_user{
      display: flex;
      align-items: center;
      img{
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
        margin-right: 10rpx;
      }
    }
    .book-detail_rate{
      color: #fadb14;
    }
  }
  .book-detail_produce{
    display: flex;
    justify-content: space-between;
    padding: 10rpx 30rpx;
  }
  .book-detail_tags{
    padding: 10rpx 20rpx;
    .book-detail_badge{
      display: inline-block;
      margin: 10rpx;
      padding: 10rpx;
      border-radius: 40rpx;
      border: 1px solid #ea5a49;
      color: #ea5a49;
    }
  }
  .book-detail_summary{
    padding: 10rpx 10rpx;
    p{
      text-indent: 2em;
      line-height: 50rpx;
    }
  }

  .book-detail_comment{
    margin-top: 30rpx;
    textarea{
      padding: 10rpx;
      height: 200rpx;
      width: 730rpx;
      background-color: #eee;
    }
    .location-switch{
      margin: 10rpx 0 0 10rpx;
      padding: 10rpx 20rpx;
    }
    .phone-switch{
      margin: 10rpx 0 0 10rpx;
      padding: 10rpx 20rpx;
      span{
        color: #ea5a49;
      }
    }
  }
}
</style>

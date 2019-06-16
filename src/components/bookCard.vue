/**
 * @desc - 首页图书
 * @props { bookData: Object }
 * @functions click -N  点击卡片事件 
 * @functions handleBtn -N  点击右侧按钮事件 
 * @example 
 *    
 */

<template>
  <div class="book-card">
    <img :src="bookData.images[0].small || ''" alt>
    <div class="book-card_info">
      <div class="book-card_info--row">
        <p>{{bookData.title}}</p>
        <div class="book-card_info--rate">
          {{bookData.rating?bookData.rating.average:'暂无评分'}}
          <rate v-if="bookData.rating" :rate="bookData.rating.average"></rate>
        </div>
      </div>
      <div class="book-card_info--row">
        <p v-for="(item,index) in bookData.author" :key="index">{{item}}</p>
        <p>浏览量：</p>
      </div>
      <div class="book-card_info--row">
        <p>{{bookData.publisher}}</p>
        <p>收藏者：</p>
      </div>
    </div>
  </div>
</template>

<script>
import rate from './rate'
export default {
  components: {
    rate
  },
  props: {
    bookData: {
      type: Object,
      default: {
        title: '默认书名',
        author: ['默认作者'],
        imgages: [],
        publisher: '默认出版社',
        rating:{
          average:''
        }
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.book-card {
  display: flex;
  background-color: #fff;
  padding: 20rpx;
  img {
    width: 240rpx;
    height: 240rpx;
    border-radius: 10rpx;
    background-color: #eee;
  }
  .book-card_info {
    width: 100%;
    margin-left: 40rpx;
    .book-card_info--row {
      margin-top: 10rpx;
      display: flex;
      justify-content: space-between;
      .book-card_info--rate{
        color: #fadb14;
      }
    }
  }
}
</style>

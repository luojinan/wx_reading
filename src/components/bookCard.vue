/**
 * @desc - 首页图书
 * @props { bookData: Object }
 * @functions click -N  点击卡片事件 
 * @functions handleBtn -N  点击右侧按钮事件 
 * @example 
 *    
 */

<template>
  <div class="book-card" @click="handleClick">
    <img @click.stop="preview" :src="bookData.images[0].small || ''" alt>
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
        <p>浏览量：{{bookData.viewTimes}}</p>
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
        rating: {
          average: ''
        }
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    },
    preview () {
      // 默认设置相册数组方式，故要设置当前图片与所有图片
      // 若只有1张，则所有图片也要设成数组
      wx.previewImage({
        current: this.bookData.images[0].small, // 当前显示图片的http链接
        urls: [this.bookData.images[0].small] // 需要预览的图片http链接列表
      })
    }
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
      .book-card_info--rate {
        color: #fadb14;
      }
    }
  }
}
</style>

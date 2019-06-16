<template>
  <div class="book-card">
    <img src="" alt="">
    <div class="book-card_info">
      <div class="book-card_info--row">
        <p>图书名</p>
        <p>分数</p>
      </div>
      <div class="book-card_info--row">
        <p>作者</p>
        <p>浏览量：</p>
      </div>
      <div class="book-card_info--row">
        <p>出版商</p>
        <p>收藏者：</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    
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
.book-card{
  display: flex;
  background-color: #fff;
  padding: 10rpx 20rpx;
  img{
    width: 240rpx;
    height: 240rpx;
    background-color: #eee;
  }
  .book-card_info{
    width: 100%;
    margin-left: 40rpx;
    .book-card_info--row{
      margin-top: 10rpx;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

/**
 * @desc - 评论列表组件
 * @props { rate: [Number, String] } 星级值
 * @props { content: String } 弹窗内容
 * @example 
 *   <my-dialog :showDialog="showDialog" @confirm="getUserInfo" @cancal="hideLogin"></my-dialog>
 */
<template>
  <div class="comment">
    <h1>评论</h1>
    <div class="comment-list" v-for="(item,index) in commentList" :key="index">
      <div class="comment-header">
        <div class="comment-header_user">
          <img :src="item.user.avatar" alt="">
          {{item.user.userName}}
        </div>
        <div class="comment-header_right">
          {{item.location||'未知地点'}}-{{item.phoneSys||'未知型号'}}
        </div>
      </div>
      <p>{{item.comment}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commentList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.comment {
    h1{
      padding: 10rpx 20rpx;
      margin-bottom: 20rpx;
      background-color: #f2f2f2;
    }
  .comment-list{
    padding: 10rpx 30rpx;
    margin-top: 10rpx;
    border-bottom: 1px solid #f2f2f2;
    &:last-child{
      border-bottom: none;
    }
    .comment-header{
      display: flex;
      justify-content: space-between;
      .comment-header_user{
        display: flex;
        align-items: center;
        font-size: 24rpx;
        img{
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
          margin-right: 10rpx;
        }
      }
      .comment-header_right{
        font-size: 24rpx;
      }
    }
    p{
      color: #999;
      margin: 20rpx 0;
    }
  }
}
</style>

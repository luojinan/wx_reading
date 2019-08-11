<template>
  <div class="mine">
    <!-- 个人中心 -->
    <!-- 图标部分 -->
    <div class="personal-center_icons">
      <div 
        @click="iconClick(index)"
        v-for="(item,index) in icons" 
        :key="index" 
        class="person-center_item">
        <img :src="item.icon" alt />
        <p>{{item.title}}</p>
      </div>
    </div>
    
    <!-- 麦当劳 -->
    <div class="maidanglao_icons">
      <div 
        v-for="(item,index) in icons" 
        :key="index" 
        class="maidanglao_item">
        <img :src="item.icon" alt />
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { add } from '@/common/utils/index.js'
let addFunc = add()
export default {
  data () {
    return {
      // 增加时，需要修改样式布局（使用网格布局grid）
      icons: [
        {
          icon: require('static/images/icon_wddd.png'),
          title: '积分商场',
          path: 'myOrder'
        },
        {
          icon: require('static/images/icon_wdsc.png'),
          title: '麦有礼',
          path: 'myCollection'
        },
        {
          icon: require('static/images/icon_wddk.png'),
          title: '点餐',
          path: 'myDaka'
        },
        {
          icon: require('static/images/icon_dddp.png'),
          title: '超值好礼',
          path: 'waitForComment'
        },
        {
          icon: require('static/images/icon_zjll.png'),
          title: '点亮梦想',
          path: 'latelyBelook'
        },
        {
          icon: require('static/images/icon_wdgz.png'),
          title: '开心乐园',
          path: 'followers'
        },
        {
          icon: require('static/images/icon_shdl.png'),
          title: '开心排队',
          path: 'shopkeeperLogin'
        },
        {
          icon: require('static/images/icon_shdl.png'),
          title: '麦乐送',
          path: 'shopkeeperSettleinModule'
        }
      ]
    }
  },
  methods:{
    // iconClick:方法
    // iconClick:throttle(()=>{
    //   console.log('真正执行了操作，节流延迟3秒')
    // },3000,'trailing'),
    // iconClick: function nameFunc (index) {
    //   console.log('不是匿名事件',index);
    // },
    // iconClick: this.throttle1(()=>{
    //   console.log('真正执行了操作，节流延迟3秒')
    // }, 3000),
    // iconClick (index) {
    //   console.log('点击到了图标',index)
    //   this.throttle1(()=>{
    //     console.log('真正执行了操作，节流延迟3秒')
    //   }, 3000)
    // },
    iconClick () {
      addFunc()
    },
    // iconClick:a(),
    callback () {
      console.log('真正执行了操作，节流延迟3秒')
    },
    throttle1 (fn, delay) {
      let start = 0
      console.log('执行节流函数开始，上次时间',start)
      return function () {
        console.log('执行节流函数内function')
        let now = new Date()
        if (now - start >= delay) {
          let context = this
          let args = arguments
          fn.apply(context, args)
          start = now
          console.log('点击间隔太短，记录这次时间',start)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.mine {
  box-sizing: border-box;
  padding: 40rpx 30rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
  .personal-center_icons{
    
    background-color: #fff;
    display: grid;
    // 几行几列;每个高/每个宽
    grid-template: auto auto auto / auto auto auto;
    grid-row-gap: 36rpx;
    justify-content: space-between;
	  justify-items: center;
	  align-items: center;
    
    padding: 30rpx;

    border: 1px solid #F9F9F9;
    box-shadow: 0 4rpx 8rpx 0 rgba(110,93,74,0.5);
    border-radius: 20rpx;
    .person-center_item{
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      img{
        width: 60rpx;
        height: 60rpx;
      }
      p{
        font-size: 26rpx;
        color: #333;
        margin-top: 16rpx;
      }
    }
  }
  .maidanglao_icons{
    margin-top: 40rpx;

    display: grid;
    grid-template: auto auto auto / auto auto auto;
    grid-row-gap: 20rpx;
    grid-column-gap: 20rpx;
    .maidanglao_item{
      background-color: #fff;
      border: 1px solid #ccc;

      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      padding: 10rpx 0;
      &:first-child{
        grid-column-start: 1;
        grid-column-end: 3;
      }
      img{
        width: 60rpx;
        height: 60rpx;
      }
      p{
        font-size: 26rpx;
        color: #333;
        margin-top: 16rpx;
      }
    }
  }
}
</style>

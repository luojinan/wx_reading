/**
 * @desc - 弹窗授权组件
 * @props { showDialog: Boolean } 弹窗显示隐藏
 * @props { content: String } 弹窗内容
 * @event confirm Y - 右侧确认按钮事件
 * @event cancal Y - 左侧取消按钮事件
 * @example 
 *   <my-dialog :showDialog="showDialog" @confirm="getUserInfo" @cancal="hideLogin"></my-dialog>
 */
<template>
<div class="mydialog" v-show="showIt">
  <!-- 遮罩 -->
  <div class="mask"></div>
  <!-- 弹窗内容 -->
  <div class="mydialog-box">
    <h1>{{content}}</h1>
    <div class="mydialog-btns">
      <button @click="cancal">取消</button>
      <button open-type="getUserInfo" @getuserinfo="confirm">确认</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:{
    showDialog:{
      type:Boolean,
      default:false
    },
    content:{
      type:String,
      default:'弹窗内容'
    }
  },
  data(){
   return {
     showIt:false
   }
  },
  watch:{
    showDialog(val){
      this.showIt = val
    }
  },
  methods:{
    cancal(){
      this.$emit('cancal')
    },
    confirm(e){
      // console.log(e,'子组件输出用户信息');
      this.$emit('confirm',e.mp.detail)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/common/scss/vars.scss';
.mydialog{
  .mask{
    z-index: 333;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
  }
  .mydialog-box{
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 80%;
    height: 250rpx;
    border-radius: 10rpx;
    background-color: #fff;
    text-align: center;
    .mydialog-btns{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      border-top: 1px solid #eee;
      button{
        width: 50%;
        color: #999;
        box-sizing: border-box;
        border-right: 1px solid #eee;
        &:last-child{
          color: $color-cr;
          border-right: none;
        }
      }
    }
  }
}
</style>

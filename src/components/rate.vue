/**
 * @desc - 评星组件
 * @props { rate: [Number, String] } 星级值
 * @props { content: String } 弹窗内容
 * @example 
 *   <my-dialog :showDialog="showDialog" @confirm="getUserInfo" @cancal="hideLogin"></my-dialog>
 */
<template>
  <div class="rate">
    <span>☆☆☆☆☆</span>
    <!-- 利用相对定位，使实心覆盖空心并定义宽度，实现星级 -->
    <div class="hollow" :style="style">★★★★★</div>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: [Number, String],
      default: '0'
    }
  },
  computed: {
    style () {
      // 豆瓣评分10分为标准，这里是5颗星要除以2
      return `width:${this.rate / 2}em`
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.rate {
  color: #fadb14;
  position: relative;
  display: inline;
  .hollow {
    color: #fadb14;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden; // 定位之后，关键要隐藏超出宽度内容
  }
}
</style>

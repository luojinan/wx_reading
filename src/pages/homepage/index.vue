<template>
<div class="homepage">
  首页
  <p>shouye </p>
</div>
</template>

<script>
export default {
  name:'',
  data(){
   return {

   }
  },
  methods:{
    init(){
      wx.request({
        url: 'http://localhost:9000/',
        success (res) {
          console.log(res)
        }
      })
    }
  },
  created(){
    console.log('启动小程序');
    this.init()
  }
}
</script>

<style scoped lang="scss">
.homepage{
  p{
    color: red;
  }
}
</style>

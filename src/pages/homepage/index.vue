<template>
  <div class="homepage">
    首页
    <p>shouye</p>
  </div>
</template>

<script>
import { getBook } from '@/api/homepage'
export default {
  name: '',
  data () {
    return {

    }
  },
  methods: {
    async init () {
      const res = await getBook()
    }
  },
  onLoad () {
    console.log('启动小程序首页')
    this.init()
  }
}
</script>

<style scoped lang="scss">
.homepage {
  p {
    color: red;
  }
}
</style>

<template>
  <div class="book-detail">
    图书详情页{{bookId}}
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      bookId: ''
    }
  },
  methods: {
    
  },
  // onload生命周期返回当前页面不会执行
  onLoad () {
    this.bookId = this.$root.$mp.query.bookId
  }
}
</script>

<style scoped lang="scss">
@import "@/common/scss/vars.scss";
.book-detail {

}
</style>

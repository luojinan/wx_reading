<template>
  <div class="mybook">
    <!-- 我的评论列表 -->

    <!-- 我添加的图书列表 -->

    <!-- 弹窗组件--授权登录 -->
    <!-- <my-dialog :showDialog="showDialog" content="确认授权登录" @confirm="getUserInfo" @cancal="hideLogin"></my-dialog> -->
  </div>
</template>

<script>
import { getcommentListByUser, getBookByUser } from '@/api/homepage'
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      showDialog: false,
      commentList: [],
      bookList: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async getcommentList () {
      const res = await getcommentListByUser(this.user._id)
      this.commentList = res.data
    },
    async getMyBooks () {
      const res = await getBookByUser(this.user._id)
      this.bookList = res.data
    }
  },
  // onLoad生命周期返回当前页面不会执行
  onLoad () {
  }
}
</script>

<style scoped lang="scss">
.mybook {
  
}
</style>

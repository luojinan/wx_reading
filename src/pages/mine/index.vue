<template>
  <div class="mine">
    <!-- 个人信息部分 -->
    <div class="mine-user">
      <img :src="user.avatarUrl" alt @click="showLogin">
      {{user.nickName || '请授权登录'}}
    </div>
    <!-- 年度进度条部分 -->
    <year-progress></year-progress>
    <!-- 添加图书按钮 -->
    <button class="mine-btn" @click="addBook">添加图书</button>
    <!-- 弹窗组件--授权登录 -->
    <my-dialog :showDialog="showDialog" content="确认授权登录" @confirm="getUserInfo" @cancal="hideLogin"></my-dialog>
  </div>
</template>

<script>
import yearProgress from '@/components/yearProgress.vue'  // 年进度组件
import myDialog from '@/components/myDialog.vue'  // 弹窗组件
import { mapGetters } from 'vuex'
import { promisify } from '@/common/utils/promisify'   // promisify工具方法，注意暴露的是对象，要解构赋值
const scanCode = promisify(wx.scanCode)              // promisify后的微信api复制给一个值(方法)
export default {
  components: {
    myDialog,
    yearProgress
  },
  data () {
    return {
      showDialog: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    addBook () {
      console.log('点击添加图书');
      // showModal({content:'确认删除？'}).then(res=>{})
      scanCode().then(res => console.log(res))
    },
    showLogin () {
      if (!this.user.nickName) this.showDialog = true
    },
    hideLogin () {
      this.showDialog = false
    },
    getUserInfo (e) {
      console.log(e, '父组件输出用户信息');
      this.$store.commit('SET_USER', e.userInfo)
      wx.setStorageSync('userInfo', e.userInfo)
      this.hideLogin()
      console.log(this.user, 'vuex用户信息');
    }
  },
  // onload生命周期返回当前页面不会执行
  onLoad () {
    // 首次进入个人中心页面取vuex，无则本地缓存中取,本地缓存无则证明未登录，user不取值为空
    if (!this.user.nickName) {
      let userStorage = wx.getStorageSync('userInfo')
      this.$store.commit('SET_USER', userStorage)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/common/scss/vars.scss";
.mine {
  padding: 0 30rpx;
  .mine-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100rpx;
    text-align: center;
    img {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background-color: #eee;
      margin-bottom: 20rpx;
    }
  }
  .mine-btn {
    margin-top: 20rpx;
    font-size: 32rpx;
    line-height: 80rpx;
    height: 80rpx;
    width: 100%;
    color: #fff;
    background-color: #fa5a49;
    border-radius: 6rpx;
    &:active {
      background-color: $color-cr;
    }
  }
}
</style>

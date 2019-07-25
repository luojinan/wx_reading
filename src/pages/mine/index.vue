<template>
  <div class="mine">
    <!-- 个人信息部分 -->
    <div class="mine-user" :style="{color:user.avatarUrl?'#666':'rgb(250, 186, 190)'}">
      <img :src="user.avatar||'/static/images/avatar.png'" @click.stop="handleAvatar" />
      {{user.userName || '请授权登录'}}
    </div>
    <!-- 年度进度条部分 -->
    <year-progress></year-progress>
    <!-- 添加图书按钮 -->
    <button v-if="user.userName" class="mine-btn" @click="addBookFn">添加图书</button>
    <!-- 弹窗组件--授权登录 -->
    <my-dialog :showDialog="showDialog" content="确认授权登录" @confirm="getUserInfo" @cancal="hideLogin"></my-dialog>
  </div>
</template>

<script>
import yearProgress from '@/components/yearProgress.vue'  // 年进度组件
import myDialog from '@/components/myDialog.vue'  // 弹窗组件
import { saveUser,addBook } from '@/api/mine'
import { mapGetters } from 'vuex'
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
    async addBookFn () {
      console.log('点击添加图书')
      const res = await this.$promisify(wx.scanCode)
      console.log(res)
      const addBookRes = await addBook({isbn: res.result})
    },
    handleAvatar () {
      if (!this.user.nickName) this.showDialog = true
    },
    hideLogin () {
      this.showDialog = false
    },
    async getUserInfo ({userInfo}) {
      wx.showLoading({
        title: 'loadin...',
        mask: true
      })
      console.log(userInfo, '父组件输出用户信息');
      const wxLoginRes = await this.$promisify(wx.login).catch(err => this.showToast('获取微信用户信息失败')) // 请求微信api获取code
      console.log(wxLoginRes.code, '获取到code');
      const params = {
        jsCode: wxLoginRes.code,
        userName: userInfo.nickName,
        avatar: userInfo.avatarUrl
      }
      const res = await saveUser(params)
      wx.hideLoading()
      this.$store.commit('SET_USER', res.data)
      wx.setStorageSync('userInfo', res.data)
      wx.setStorageSync('token', res.token)
      this.hideLogin()
    }
  },
  // onLoad生命周期返回当前页面不会执行
  onLoad () {
    // 首次进入个人中心页面取vuex
    // vuex无则本地缓存中取，并存入vuex
    // 本地缓存无则证明未登录，user不取值为空
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
  height: 100vh;
  .mine-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100rpx 0;
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
    margin-top: 100rpx;
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

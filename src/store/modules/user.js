// import { login } from '@/api/login'

const user = {
  state: {
    user: {}
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    // 修改用户名，并单独更新vuex的用户名
    SET_NICKNAME: (state, nickName) => {
      state.user.nickName = nickName
    },
    SET_AVATAR: (state, avatar) => {
      state.user.avatarFull = avatar
    }
  }

}

export default user

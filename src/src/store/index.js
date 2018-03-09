import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    actionSheet: {
      admin: false, // true 代表管理员
      detail: {},
      index: 0,
      bbs: []    // 当前回复数组
    }, // 用户管理员动画
    floorType:'' // 记录回复楼层类型
  },
  mutations: {
    Setaction (state, b) {
      state.actionSheet = b
    },
    SetType (state, b) {
      state.floorType = b
    },
  },
  actions: {
    Setaction (context, b) {
      context.commit('Setaction', b)
    },
    SetType (context, b) {
      context.commit('SetType', b)
    }
  }
})

export default store

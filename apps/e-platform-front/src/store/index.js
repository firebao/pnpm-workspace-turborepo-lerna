import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  systemStateOfMenuList: [], // 系统展示状态列表
  token: '',
  userInfo: {} // 存储登录用户名的状态
}

const getters = { // 实时监听state值的变化(最新状态)
  getAccessToken(state) {
    return state.token
  },
  getIUserInfo(state, getters) {
    return state.userInfo
  }
}
const mutations = {
  // 系统展示状态列表
  setToken(state, data) {
    state.token = data
  },
  setUserInfo(state, data) {
    state.userInfo = data;
  },
}
const actions = {}
const modules = {}
export default new Vuex.Store({
  state: {
    userInfo: {} // 存储登录用户名的状态
  },
  getters: {
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
    },
  },
  actions: {
  },
  modules: {
    modules
  }
})

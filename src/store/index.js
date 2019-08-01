// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage, removeStorage } from '@/utils/wx'
import { userLogin, getUserInfo, getShoppingCartLists } from '@/api/'
const TokenKey = 'wxAppToken'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    userInfo: {},
    shoppingCartLists: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_SHOPPINGCART: (state, shoppingCartLists) => {
      state.shoppingCartLists = shoppingCartLists
    }
  },
  actions: {
    // 从localStorage 获取token
    getToken({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getStorage(TokenKey).then((res) => {
          console.log("TCL: getToken -> res", res)
          commit('SET_TOKEN', token)
          // 有token后获取用户信息
          dispatch('getInfo')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 购物车列表
    getShoppingLists({ commit, state }) {
      return new Promise((resolve, reject) => {
        getShoppingCartLists(state.token).then(response => {
          const data = response
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          commit('SET_SHOPPINGCART', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录  登录时将token存在localStorage中
    login({ commit, dispatch }, userInfo) {
      const { username, valid_code } = userInfo
      return new Promise((resolve, reject) => {
        userLogin({ username: username.trim(), valid_code: valid_code }).then(response => {
          const { token } = response
          commit('SET_TOKEN', token)
          // 有token后获取用户信息
          dispatch('getInfo')
          setStorage(TokenKey, token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }
          commit('SET_USERINFO', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', {})
        removeStorage(TokenKey)
        resolve()
      })
    }
  }
})

export default store

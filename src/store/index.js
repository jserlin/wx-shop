// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import { wxLogin, getStorage, setStorage, removeStorage } from '@/utils/wx'
import { userLogin, getUserInfo, getShoppingCartLists, getSessionKeyOropenid } from '@/api/'
const TokenKey = 'wxAppToken'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    userInfo: {},
    wxUserInfo: {},
    openid: '',
    address: {},
    currentCate: {},
    shoppingCartLists: [],
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_WXUSERINFO: (state, wxUserInfo) => {
      state.wxUserInfo = wxUserInfo
    },
    SET_OPENID: (state, openId) => {
      state.openId = openId
    },
    SET_SHOPPINGCART: (state, shoppingCartLists) => {
      state.shoppingCartLists = shoppingCartLists
    },
    SET_ADDRESS: (state, address) => {
      state.address = address
    },
    SET_CATE: (state, cate) => {
      state.currentCate = cate
    }
  },
  actions: {
    // 用code去服务端解密 换openId
    getOpenId({ commit }) {
      return new Promise((resolve, reject) => {
        wxLogin().then((res) => {
          const { code } = res
          getSessionKeyOropenid({code}).then((result) => {
            commit('SET_OPENID', result.openid || '')
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 从localStorage 获取token
    getToken({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getStorage(TokenKey).then((res) => {
          if (res.data) {
            commit('SET_TOKEN', res.data)
            // 有token后获取用户信息 购物车信息
            dispatch('getInfo', res.data)
            dispatch('getShoppingLists', res.data)
            resolve()
          } else {
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 购物车列表
    getShoppingLists({ commit, state }, token) {
      return new Promise((resolve, reject) => {
        getShoppingCartLists({ userToken: token || state.token }).then(response => {
          const { data } = response
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
        userLogin({ username: username.trim(), valid_code: valid_code }).then(async response => {
          const { data } = response
          if (data) {
            await commit('SET_TOKEN', data)
            // 有token后获取用户信息 购物车信息
            await dispatch('getInfo', data)
            dispatch('getShoppingLists', data)
            setStorage(TokenKey, data)
            resolve()
          } else {
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    getInfo({ commit, state }, token) {
      return new Promise((resolve, reject) => {
        getUserInfo({ userToken: token }).then(response => {
          const { data } = response
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

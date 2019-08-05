<script>
export default {
  globalConfig: {
    usingComponents: {
      "van-swipe-cell": "/vant-weapp/dist/swipe-cell/index",
      "van-row": "/vant-weapp/dist/row/index",
      "van-col": "/vant-weapp/dist/col/index",
       "van-loading": "/vant-weapp/dist/loading/index"
    }
  },
  created () {
    // 从localStorage 获取token 存在vuex中
    this.$store.dispatch('getToken')
    this.$store.dispatch('getOpenId')
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // eslint-disable-next-line
    // console.log('app created and cache logs by setStorageSync')
  }
}
</script>
<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
